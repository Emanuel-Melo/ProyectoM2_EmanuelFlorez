import request from "supertest";
import app from "../src/index.js";

describe("Authors API", () => {

    test("GET /authors should return all authors", async () => {
        const res = await request(app).get("/authors");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /authors should create a new author", async () => {
        const res = await request(app)
            .post("/authors")
            .send({
                name: "Test User",
                email: `test${Date.now()}@example.com`, // 🔥 evita duplicados
                bio: "Testing"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
    });

    test("POST /authors should fail without name", async () => {
        const res = await request(app)
            .post("/authors")
            .send({
                email: `fail${Date.now()}@example.com`
            });

        expect(res.statusCode).toBe(400);
    });

    test("GET /authors/:id should return 404 if not found", async () => {
        const res = await request(app).get("/authors/99999");

        expect(res.statusCode).toBe(404);
    });

});