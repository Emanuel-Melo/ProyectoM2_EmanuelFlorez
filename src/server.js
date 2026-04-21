import app from "./index.js";
import pool from "./db/db.js";

const PORT = process.env.PORT || 3000;

pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL"))
    .catch(err => console.error("❌ Error de conexión", err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});