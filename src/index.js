import express from "express";
import authorsRoutes from "./routes/authors-routes.js";
import postsRoutes from "./routes/posts-routes.js";
import errorHandler from "./middlewares/error-handler.js";
import pool from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.use("/authors", authorsRoutes);
app.use("/posts", postsRoutes);

app.use(errorHandler);

pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL"))
    .catch(err => console.error("❌ Error de conexión", err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;