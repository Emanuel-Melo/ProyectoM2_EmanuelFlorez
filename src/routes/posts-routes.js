import express from "express";
import {
    getAllPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
} from "../services/posts-service.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const post = await getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        next(error);
    }
});

router.get("/author/:authorId", async (req, res, next) => {
    try {
        const posts = await getPostsByAuthor(req.params.authorId);
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { title, content, author_id } = req.body;

        if (!title || !content || !author_id) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const newPost = await createPost(title, content, author_id);

        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { title, content, published } = req.body;

        const updated = await updatePost(
            req.params.id,
            title,
            content,
            published
        );

        if (!updated) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updated);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await deletePost(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;