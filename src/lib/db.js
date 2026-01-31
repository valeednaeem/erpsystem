import mysql from "mysql2/promise";


const execute = async (query, params = []) => {
  const [results] = await pool.execute(query, params);
  return results;
};

const query = async (query, params = []) => {
  const [results] = await pool.query(query, params);
  return results;
};


/** @type {import("mysql2/promise").Pool} */
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "erm",
  query: query,
  execute: execute,
  waitForConnections: true,
  connectionLimit: 10
});

const connect = async () => {
  const connection = await pool.getConnection();
  console.log("Database connected");
  connection.release();
};

connect().catch((err) => {
  console.error("Database connection failed:", err);
  // process.exit(1);
});

export const config = {
  matcher: ["/api/:path*"],
};

export default pool;
