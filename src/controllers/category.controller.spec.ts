/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../server";
import request from "supertest";

describe("Create category controller", () => {
  it("Should be able to create a category", async () => {
    const response = await request(app.app)
      .post("/category")
      .send({ name: "Eletrônicos" });

    let category = response.body.category;
    expect(response.status).toBe(201);
    expect(category).toHaveProperty("id");
    expect(category.name).toBe("Eletrônicos");
  });

  it("Should not be able to create an existing category", async () => {
    await request(app.app).post("/category").send({ name: "Lazer" });

    const response = await request(app.app)
      .post("/category")
      .send({ name: "Lazer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Category already exists!");
  });
});

describe("Find category controller", () => {
  it("Should be able to search a category", async () => {
    const categoryResponse = await request(app.app)
      .post("/category")
      .send({ name: "Cozinha" });

    let category = categoryResponse.body.category;
  });

  it("Should not be able to create an existing category", async () => {
    await request(app.app).post("/category").send({ name: "Lazer" });

    const response = await request(app.app)
      .post("/category")
      .send({ name: "Lazer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Category already exists!");
  });
});
