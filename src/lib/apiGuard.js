// lib/apiGuard.js
import db from "@/lib/db";

export async function requirePermission(userId, permission) {
  const [rows] = await db.execute(`
    SELECT 1
    FROM role_permissions rp
    JOIN users u ON u.role_id = rp.role_id
    JOIN permissions p ON p.id = rp.permission_id
    WHERE u.id = ? AND p.name = ?
  `, [userId, permission]);

  if (!rows.length) {
    throw new Error("Forbidden");
  }
}

