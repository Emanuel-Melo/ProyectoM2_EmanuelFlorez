import app from "./index.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

server.on("error", (err) => {
    console.error("❌ Error al iniciar el servidor:", err.message);
});