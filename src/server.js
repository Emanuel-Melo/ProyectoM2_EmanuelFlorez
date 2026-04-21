import app from "./index.js";
import pool from "./db/db.js";

const PORT = process.env.PORT || 3000;

// Conectar DB primero
pool.connect()
    .then(() => {
        console.log("✅ Conectado a PostgreSQL");

        app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Error de conexión a PostgreSQL:", err.message);
    });