import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

pool.connect()
    .then(() => {
        console.log("✅ Conectado a PostgreSQL correctamente");
    })
    .catch((err) => {
        console.error("❌ Error conectando a PostgreSQL:", err.message);
    });

export default pool;