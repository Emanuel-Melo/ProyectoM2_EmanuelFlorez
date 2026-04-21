import express from "express";
import {
    getAllPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost,
    checkAuthorExists
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

router.get("/author/:authorId", async (req, res, next) => {
    try {
        const authorId = parseInt(req.params.authorId);

        if (isNaN(authorId)) {
            return res.status(400).json({ message: "Invalid author id" });
        }

        const posts = await getPostsByAuthor(authorId);
        res.json(posts);

    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid post id" });
        }

        const post = await getPostById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);

    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { title, content, author_id } = req.body;

        if (!title?.trim() || !content?.trim() || !author_id) {
            return res.status(400).json({
                message: "title, content and author_id are required"
            });
        }

        const authorId = parseInt(author_id);

        if (isNaN(authorId)) {
            return res.status(400).json({ message: "Invalid author_id" });
        }

        const authorExists = await checkAuthorExists(authorId);

        if (!authorExists) {
            return res.status(404).json({
                message: "Author not found"
            });
        }

        const newPost = await createPost(title, content, authorId);
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid post id" });
        }

        const { title, content, published } = req.body;

        if (!title && !content && published === undefined) {
            return res.status(400).json({
                message: "At least one field must be provided"
            });
        }

        const updated = await updatePost(id, title, content, published);

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
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid post id" });
        }

        const deleted = await deletePost(id);

        if (!deleted) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(204).send();

    } catch (error) {
        next(error);
    }
});

export default router;