import pool from "../db/db.js";

export const getAllComments = async () => {
    const result = await pool.query(
        `SELECT 
            c.*,
            a.name AS author_name,
            p.title AS post_title
        FROM comments c
        JOIN authors a ON c.author_id = a.id
        JOIN posts p ON c.post_id = p.id
        ORDER BY c.id`
    );
    return result.rows;
};

export const getCommentById = async (id) => {
    const result = await pool.query(
        `SELECT 
            c.*,
            a.name AS author_name,
            p.title AS post_title
        FROM comments c
        JOIN authors a ON c.author_id = a.id
        JOIN posts p ON c.post_id = p.id
        WHERE c.id = $1`,
        [id]
    );

    return result.rows[0] || null;
};

export const getCommentsByPost = async (postId) => {
    const result = await pool.query(
        `SELECT 
            c.*,
            a.name AS author_name
        FROM comments c
        JOIN authors a ON c.author_id = a.id
        WHERE c.post_id = $1
        ORDER BY c.id`,
        [postId]
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

export const checkPostExists = async (post_id) => {
    const result = await pool.query(
        "SELECT id FROM posts WHERE id = $1",
        [post_id]
    );
    return result.rows.length > 0;
};

export const createComment = async (content, author_id, post_id) => {
    const result = await pool.query(
        `INSERT INTO comments (content, author_id, post_id)
        VALUES ($1, $2, $3)
         RETURNING *`,
        [content, author_id, post_id]
    );

    return result.rows[0];
};

export const deleteComment = async (id) => {
    const result = await pool.query(
        "DELETE FROM comments WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0] || null;
};