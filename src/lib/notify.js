export async function notify(user_id, type, message) {
  await db.execute(`
    INSERT INTO notifications (user_id, type, message)
    VALUES (?, ?, ?)
  `, [user_id, type, message]);
}
