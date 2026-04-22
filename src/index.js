import express from "express";
import authorsRoutes from "./routes/authors-routes.js";
import postsRoutes from "./routes/posts-routes.js";
import commentsRoutes from "./routes/comments-routes.js";
import errorHandler from "./middlewares/error-handler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/authors", authorsRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.use(errorHandler);

export default app;

process.on("uncaughtException", (err) => {
    console.error("UNCUGHT ERROR:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});