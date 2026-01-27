import mysql from "mysql2/promise";

/** @type {import("mysql2/promise").Pool} */
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "erm",
});

export default pool;
