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
        const author = await getAuthorById(req.params.id);

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

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const newAuthor = await createAuthor(name, email, bio);

        res.status(201).json(newAuthor);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { name, email, bio } = req.body;

        const updated = await updateAuthor(
            req.params.id,
            name,
            email,
            bio
        );

        if (!updated) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.json(updated);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await deleteAuthor(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;