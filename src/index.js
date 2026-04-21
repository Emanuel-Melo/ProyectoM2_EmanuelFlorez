import express from "express";
import authorsRoutes from "./routes/authors-routes.js";
import postsRoutes from "./routes/posts-routes.js";
import errorHandler from "./middlewares/error-handler.js";
import commentsRoutes from "./routes/comments-routes.js";

app.use("/comments", commentsRoutes);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.use("/authors", authorsRoutes);
app.use("/posts", postsRoutes);

app.use(errorHandler);

export default app;