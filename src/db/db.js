import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(client => {
        console.log("✅ DB conectada");
        client.release();
    })
    .catch(err => {
        console.error("❌ Error DB:", err.message);
    });

export default pool;