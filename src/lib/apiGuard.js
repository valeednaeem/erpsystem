import db from "./db";

/**
 * Checks permission for API routes
 * @param {Request} req
 * @param {string} requiredPermission
 */
export async function requirePermission(req, requiredPermission) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/user_id=([^;]+)/);
  const userId = match ? match[1] : null;

  if (!userId) {
    return {
      ok: false,
      status: 401,
      error: "Unauthorized",
    };
  }

  const [rows] = await db.execute(
    `
    SELECT DISTINCT p.name
    FROM permissions p
    LEFT JOIN role_permissions rp ON p.id = rp.permission_id
    LEFT JOIN user_permissions up ON p.id = up.permission_id
    LEFT JOIN roles r ON rp.role_id = r.id
    LEFT JOIN users u ON u.role_id = r.id
    WHERE u.id = ?
       OR up.user_id = ?
    `,
    [userId, userId]
  );

  const permissions = rows.map((r) => r.name);

  if (!permissions.includes(requiredPermission)) {
    return {
      ok: false,
      status: 403,
      error: "Forbidden",
    };
  }

  return {
    ok: true,
    userId,
    permissions,
  };
}
