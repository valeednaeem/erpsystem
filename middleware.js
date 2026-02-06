import { NextResponse } from "next/server";
import db from "./src/lib/db.js";
import { getUserWithPermissions, isAdmin } from "./src/lib/permissions.js";

// Middleware: allow only authenticated users to reach protected areas.
// - Any authenticated user can access `/dashboard` and see features based on role.
// - `/admin` routes remain restricted to users with the `admin` role.
export async function middleware(req) {
    const userId = req.cookies.get("user_id")?.value;
    if (!userId) {
        console.log("[middleware] no user_id cookie, redirecting to /login", req.nextUrl.pathname);
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const user = await validateUser(userId);
    if (!user) {
        console.log("[middleware] user not found in DB for id:", userId);
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const pathname = req.nextUrl.pathname;

    // Protect admin routes strictly
    if (pathname.startsWith("/admin")) {
        const admin = await isAdmin(userId);
        if (!admin) {
            console.log("[middleware] Non-admin user attempting admin access:", userId);
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    // Fetch user with full permissions info
    const userWithPerms = await getUserWithPermissions(userId);
    if (!userWithPerms) {
        console.log("[middleware] Failed to load user permissions for id:", userId);
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Attach user info to the request headers so downstream pages/components
    // can render conditionally without an extra DB round-trip.
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", String(user.id));
    requestHeaders.set("x-user-role-id", String(user.role_id || ""));
    requestHeaders.set("x-user-role-name", userWithPerms.role_name || "");
    requestHeaders.set("x-user-permissions", JSON.stringify(userWithPerms.permissionNames || []));
    requestHeaders.set("x-user-email", user.email || "");

    console.log("[middleware] User authenticated:", { 
        id: userId, 
        role: userWithPerms.role_name, 
        permissions: userWithPerms.permissionNames?.length || 0 
    });

    return NextResponse.next({ request: { headers: requestHeaders } });
}

// Apply middleware to dashboard, profile and admin routes, only if the user is logged in
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
};

export async function validateUser(userId) {
    const results = await db.query("SELECT id, email, role_id FROM users WHERE id = ?", [userId]);
    return results.length > 0 ? results[0] : null;
}


