const express = require('express');
const router = express.Router();

let authors = [
    { id: 1, name: 'Ana García', email: 'ana@example.com', bio: 'Dev' },
    { id: 2, name: 'Carlos Ruiz', email: 'carlos@example.com', bio: 'Writer' }
];

router.get('/', (req, res) => {
    res.json(authors);
});

router.get('/:id', (req, res) => {
    const author = authors.find(a => a.id == req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json(author);
});

router.post('/', (req, res) => {
    const { name, email, bio } = req.body;

    if (!name) return res.status(400).json({ message: 'Name is required' });

    const newAuthor = {
        id: authors.length + 1,
        name,
        email,
        bio
    };

    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

router.put('/:id', (req, res) => {
    const author = authors.find(a => a.id == req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    const { name, email, bio } = req.body;

    author.name = name || author.name;
    author.email = email || author.email;
    author.bio = bio || author.bio;

    res.json(author);
});

router.delete('/:id', (req, res) => {
    const index = authors.findIndex(a => a.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Author not found' });

    authors.splice(index, 1);
    res.status(204).send();
});

module.exports = router;