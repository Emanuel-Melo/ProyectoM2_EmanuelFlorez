import pool from "../db/db.js";

export const getAllComments = async () => {
    const result = await pool.query(
        "SELECT * FROM comments ORDER BY id"
    );
    return result.rows;
};

export const getCommentsByPost = async (postId) => {
    const result = await pool.query(
        "SELECT * FROM comments WHERE post_id = $1",
        [postId]
    );
    return result.rows;
};

export const createComment = async (post_id, author_name, content) => {
    const result = await pool.query(
        `INSERT INTO comments (post_id, author_name, content)
        VALUES ($1, $2, $3)
         RETURNING *`,
        [post_id, author_name, content]
    );

    return result.rows[0];
};