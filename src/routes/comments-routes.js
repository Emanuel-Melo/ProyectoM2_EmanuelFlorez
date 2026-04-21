import express from "express";

import {
    getAllComments,
    getCommentById,
    getCommentsByPost,
    createComment,
    deleteComment,
    checkAuthorExists,
    checkPostExists
} from "../services/comments-service.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const comments = await getAllComments();
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

router.get("/post/:postId", async (req, res, next) => {
    try {
        const postId = parseInt(req.params.postId);

        if (isNaN(postId)) {
            return res.status(400).json({ message: "Invalid post id" });
        }

        const comments = await getCommentsByPost(postId);
        res.json(comments);

    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid comment id" });
        }

        const comment = await getCommentById(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json(comment);

    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { content, author_id, post_id } = req.body;

        if (!content?.trim() || !author_id || !post_id) {
            return res.status(400).json({
                message: "content, author_id and post_id are required"
            });
        }

        const authorId = parseInt(author_id);
        const postId = parseInt(post_id);

        if (isNaN(authorId) || isNaN(postId)) {
            return res.status(400).json({
                message: "Invalid author_id or post_id"
            });
        }

        const authorExists = await checkAuthorExists(authorId);
        if (!authorExists) {
            return res.status(404).json({ message: "Author not found" });
        }

        const postExists = await checkPostExists(postId);
        if (!postExists) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = await createComment(content, authorId, postId);
        res.status(201).json(newComment);

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid comment id" });
        }

        const deleted = await deleteComment(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        res.status(204).send();

    } catch (error) {
        next(error);
    }
});

export default router;