import db from "@/lib/db";

export async function logActivity(userId, action, module, refId = null) {
  await db.execute(
    `INSERT INTO activity_logs (user_id, action, module, reference_id)
     VALUES (?, ?, ?, ?)`,
    [userId, action, module, refId]
  );
}

