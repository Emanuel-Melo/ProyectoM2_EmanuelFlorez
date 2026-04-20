const express = require('express');
const router = express.Router();

let posts = [
    { id: 1, title: 'Post 1', content: 'Contenido', author_id: 1, published: true }
];

// GET all
router.get('/', (req, res) => {
    res.json(posts);
});

// GET by id
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
});

// GET by author
router.get('/author/:authorId', (req, res) => {
    const result = posts.filter(p => p.author_id == req.params.authorId);
    res.json(result);
});

// POST
router.post('/', (req, res) => {
    const { title, content, author_id } = req.body;

    if (!title || !content || !author_id) {
    return res.status(400).json({ message: 'Missing fields' });
    }

    const newPost = {
        id: posts.length + 1,
        title,
        content,
        author_id,
        published: false
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT
router.put('/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { title, content, published } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.published = published ?? post.published;

    res.json(post);
});

// DELETE
router.delete('/:id', (req, res) => {
    const index = posts.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Post not found' });

    posts.splice(index, 1);
    res.status(204).send();
});

module.exports = router;