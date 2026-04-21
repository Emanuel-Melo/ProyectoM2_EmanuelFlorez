import express from "express";
import {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} from "../services/authors-service.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const authors = await getAllAuthors();
        res.json(authors);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid author id" });
        }

        const author = await getAuthorById(id);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.json(author);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { name, email, bio } = req.body;

        if (!name?.trim() || !email?.trim()) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const newAuthor = await createAuthor(name, email, bio);
        res.status(201).json(newAuthor);

    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ message: "Email already exists" });
        }
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid author id" });
        }

        const { name, email, bio } = req.body;

        const updated = await updateAuthor(id, name, email, bio);

        if (!updated) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.json(updated);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ message: "Email already exists" });
        }
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid author id" });
        }

        const deleted = await deleteAuthor(id);

        if (!deleted) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;