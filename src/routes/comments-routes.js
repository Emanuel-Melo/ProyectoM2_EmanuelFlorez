import express from "express";
import pool from "../db/db.js";

import {
    getAllComments,
    getCommentById,
    getCommentsByPost,
    createComment,
    deleteComment
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

router.get("/:id", async (req, res, next) => {
    try {
        const comment = await getCommentById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json(comment);
    } catch (error) {
        next(error);
    }
});

router.get("/post/:postId", async (req, res, next) => {
    try {
        const comments = await getCommentsByPost(req.params.postId);
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { content, author_id, post_id } = req.body;

        if (!content || !author_id || !post_id) {
            return res.status(400).json({
                message: "content, author_id and post_id are required"
            });
        }

        const author = await pool.query(
            "SELECT id FROM authors WHERE id = $1",
            [author_id]
        );

        if (author.rows.length === 0) {
            return res.status(400).json({
                message: "Author does not exist"
            });
        }

        const post = await pool.query(
            "SELECT id FROM posts WHERE id = $1",
            [post_id]
        );

        if (post.rows.length === 0) {
            return res.status(400).json({
                message: "Post does not exist"
            });
        }

        const newComment = await createComment(
            content,
            author_id,
            post_id
        );

        res.status(201).json(newComment);

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await deleteComment(req.params.id);

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