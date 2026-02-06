// connecting the database for user validation, role checking and more using mysql2
import mysql from "mysql2/promise";

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "erm",
};

const db = {
    query: async (query, params) => {
        const connection = await mysql.createConnection(dbConfig);
        console.log("Database Connected!")
        const [results] = await connection.execute(query, params);
        console.log("Query Executed!");
        await connection.end();
        return results;
    },
};

export default db;