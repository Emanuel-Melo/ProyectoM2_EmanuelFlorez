import request from "supertest";
import app from "../src/index.js";
import pool from "../src/db/db.js";

describe("Comments API", () => {

    let createdCommentId;

    test("GET /comments should return all comments", async () => {
        const res = await request(app).get("/comments");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /comments should create a comment", async () => {
        const res = await request(app)
            .post("/comments")
            .send({
                content: "Test comment",
                author_id: 1,
                post_id: 1
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.content).toBe("Test comment");

        createdCommentId = res.body.id;
    });

    test("POST /comments should fail without required fields", async () => {
        const res = await request(app)
            .post("/comments")
            .send({
                content: "Missing fields"
            });

        expect(res.statusCode).toBe(400);
    });
    test("POST /comments should fail if author does not exist", async () => {
        const res = await request(app)
            .post("/comments")
            .send({
                content: "Invalid author",
                author_id: 999999,
                post_id: 1
            });
        expect(res.statusCode).toBe(404);
    });
    test("POST /comments should fail if post does not exist", async () => {
        const res = await request(app)
            .post("/comments")
            .send({
                content: "Invalid post",
                author_id: 1,
                post_id: 999999
            });

        expect(res.statusCode).toBe(404);
    });

    test("GET /comments/post/:postId should return comments by post", async () => {
        const res = await request(app).get("/comments/post/1");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty("content");
        }
    });

    test("DELETE /comments/:id should delete comment", async () => {
        const res = await request(app).delete(`/comments/${createdCommentId}`);

        expect(res.statusCode).toBe(204);
    });

    test("GET /comments/:id should return 404 if not found", async () => {
        const res = await request(app).get("/comments/999999");

        expect(res.statusCode).toBe(404);
    });

});