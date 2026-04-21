import express from "express";
import {
    getAllComments,
    getCommentsByPost,
    createComment
} from "../services/comments-service.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const comments = await getAllComments();
        res.json(comments);
    } catch (err) {
        next(err);
    }
});

router.get("/post/:postId", async (req, res, next) => {
    try {
        const comments = await getCommentsByPost(req.params.postId);
        res.json(comments);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { post_id, author_name, content } = req.body;

        if (!post_id || !author_name || !content) {
            return res.status(400).json({
                message: "post_id, author_name and content are required"
            });
        }

        const comment = await createComment(post_id, author_name, content);

        res.status(201).json(comment);

    } catch (err) {
        next(err);
    }
});

export default router;