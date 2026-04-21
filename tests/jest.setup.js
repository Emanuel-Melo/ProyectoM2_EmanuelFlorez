import pool from "../src/db/db.js";

afterAll(async () => {
    await pool.end();
});