import pool from "../db/db.js";

export const getAllComments = async () => {
    const result = await pool.query(
        "SELECT * FROM comments ORDER BY id"
    );
    return result.rows;
};

export const getCommentById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM comments WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

export const getCommentsByPost = async (postId) => {
    const result = await pool.query(
        "SELECT * FROM comments WHERE post_id = $1 ORDER BY id",
        [postId]
    );
    return result.rows;
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

    return result.rows[0];
};