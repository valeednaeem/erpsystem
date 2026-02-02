import { execute } from "@/lib/db";

export async function requirePermission(userId, permission) {
  const [rows] = await execute(
    `
    SELECT 1
    FROM permissions p
    JOIN role_permissions rp ON rp.permission_id = p.id
    JOIN users u ON u.role_id = rp.role_id
    WHERE u.id = ? AND p.name = ?
    `,
    [userId, permission]
  );

  if (rows.length === 0) {
    throw new Error("Forbidden");
  }
}
