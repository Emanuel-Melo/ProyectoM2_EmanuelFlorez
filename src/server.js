import app from "./index.js";
import pool from "./db/db.js";

const PORT = process.env.PORT || 8080;

pool.query("SELECT NOW()")
    .then(() => console.log("✅ DB conectada"))
    .catch(err => console.error("❌ DB error:", err));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});