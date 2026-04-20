import pool from "../db/db.js";

export const getAllPosts = async () => {
    const result = await pool.query("SELECT * FROM posts ORDER BY id");
    return result.rows;
};

export const getPostById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM posts WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

export const getPostsByAuthor = async (authorId) => {
    const result = await pool.query(
        `SELECT 
            posts.id,
            posts.title,
            posts.content,
            posts.published,
            posts.created_at,
            authors.id AS author_id,
            authors.name AS author_name,
            authors.email AS author_email
        FROM posts
        JOIN authors ON posts.author_id = authors.id
        WHERE authors.id = $1
        ORDER BY posts.id`,
        [authorId]
    );

    return result.rows;
};

export const createPost = async (title, content, author_id) => {
    const result = await pool.query(
        `INSERT INTO posts (title, content, author_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [title, content, author_id]
    );

    return result.rows[0];
};

export const updatePost = async (id, title, content, published) => {
    const result = await pool.query(
        `UPDATE posts
        SET title = COALESCE($1, title),
            content = COALESCE($2, content),
            published = COALESCE($3, published)
        WHERE id = $4
        RETURNING *`,
        [title, content, published, id]
    );

    return result.rows[0];
};

export const deletePost = async (id) => {
    const result = await pool.query(
        "DELETE FROM posts WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};