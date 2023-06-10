/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../server";
import request from "supertest";

describe("Create product controller", () => {
  it("Should be able to create a product without attached category", async () => {
    const response = await request(app.app).post("/product").send({
      name: "Mouse",
      bar_code: "987654321",
      price: 10.99,
      category_id: "",
    });

    let product = response.body.product;
    expect(response.status).toBe(201);
    expect(product).toHaveProperty("id");
    expect(product.name).toBe("Mouse");
  });

  it("Should not be able to create an existing product", async () => {
    await request(app.app).post("/product").send({
      name: "Teclado",
      bar_code: "123456789",
      price: 19.99,
      category_id: "",
    });

    const response = await request(app.app).post("/product").send({
      name: "Teclado",
      bar_code: "123456789",
      price: 19.99,
      category_id: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Product already exists!");
  });

  it("Should be able to create a product with a category_id (need to create category first)", async () => {
    const categoryResponse = await request(app.app)
      .post("/category")
      .send({ name: "Periféricos" });

    let category = categoryResponse.body.category;
    expect(categoryResponse.status).toBe(201);
    expect(category).toHaveProperty("id");
    expect(category.name).toBe("Periféricos");

    const productResponse = await request(app.app).post("/product").send({
      name: "Headphones",
      bar_code: "000000000",
      price: 14.99,
      category_id: category.id,
    });

    expect(productResponse.status).toBe(201);
    expect(productResponse.body.product).toHaveProperty("id");

    const product = await request(app.app).get(
      `/product/${productResponse.body.product.id}`
    );

    console.log("product.body: " + JSON.stringify(product.body));

    // expect(product.name).toBe("Headphones");
    // expect(product.category_id).toBe(category.id);
  });
});
