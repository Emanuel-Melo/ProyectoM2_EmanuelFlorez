import pool from "../db/db.js";

export const getAllPosts = async () => {
    const result = await pool.query(
        "SELECT * FROM posts ORDER BY id"
    );
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
        "SELECT * FROM posts WHERE author_id = $1",
        [authorId]
    );
    return result.rows;
};

export const checkAuthorExists = async (author_id) => {
    const result = await pool.query(
        "SELECT id FROM authors WHERE id = $1",
        [author_id]
    );
    return result.rows.length > 0;
};

export const createPost = async (title, content, author_id, published = false) => {

    const result = await pool.query(
        `INSERT INTO posts (title, content, author_id, published)
        VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [title, content, author_id, published]
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

const deletePost = async (id) => {
    const result = await pool.query(
        "DELETE FROM posts WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};