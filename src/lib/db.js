import mysql from "mysql2/promise";

let pool;

export function db() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "erm",
    });
  }
  return pool;
}

export async function execute(query, params = []) {
  const db = db();
  return db.execute(query, params);
}
