import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function middleware(req) {
  const userId = req.cookies.get("user_id")?.value;

  // Allow API auth-free for now
  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (!userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const [rows] = await db.execute(`
SELECT DISTINCT p.name
FROM permissions p
LEFT JOIN role_permissions rp ON p.id = rp.permission_id
LEFT JOIN user_permissions up ON p.id = up.permission_id
LEFT JOIN users u ON rp.role_id = u.role_id
WHERE u.id = ?
   OR up.user_id = ?
  `, [userId]);

  const permissions = rows.map(r => r.name);

  const path = req.nextUrl.pathname;

  const routePermissions = [
    { path: "/dashboard/sales", permission: "SALES_VIEW" },
    { path: "/dashboard/production", permission: "PRODUCTION_VIEW" },
    { path: "/dashboard/warehouse", permission: "WAREHOUSE_PUTAWAY" },
  ];

  const rule = routePermissions.find(r => path.startsWith(r.path));

  if (rule && !permissions.includes(rule.permission)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  await db.execute(
    `INSERT INTO activity_logs (user_id, action, module, path)
     VALUES (?, 'ACCESS', ?, ?)`,
    [userId, rule?.permission || 'GENERAL', path]
  );

  return NextResponse.next();
}
