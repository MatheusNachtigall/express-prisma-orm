import { describe } from "node:test";
import {
  CategoriesRepositoryInMemory,
  ProductsRepositoryInMemory,
} from "../repository";
import { Category, Product } from "../entities";

describe("Create Product without category", () => {
  let productsRepository: ProductsRepositoryInMemory;

  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
  });

  it("should create a new product", async () => {
    const productData: Product = {
      name: "Mouse",
      bar_code: "123456789",
      price: 10.99,
    };
    const product = await productsRepository.create(productData);

    expect(product.name).toBe("Mouse");
    expect(product).toHaveProperty("id");
  });

  it("should not be able to create an existing product", async () => {
    const productData: Product = {
      name: "Teclado",
      bar_code: "987654321",
      price: 20.99,
    };
    await productsRepository.create(productData);

    await expect(productsRepository.create(productData)).rejects.toThrowError(
      "Product already exists!"
    );
  });
});

describe("Create Product with a category", () => {
  let productsRepository: ProductsRepositoryInMemory;
  let categoriesRepository: CategoriesRepositoryInMemory;
  let categoryData: Category;
  let category: Category;
  beforeAll(async () => {
    productsRepository = new ProductsRepositoryInMemory();
    categoriesRepository = new CategoriesRepositoryInMemory();
    categoryData = { name: "Livros" };
    category = await categoriesRepository.create(categoryData);
  });

  it("should create a new product", async () => {
    const productData: Product = {
      name: "Harry Potter",
      bar_code: "000000000",
      price: 15.99,
      category_id: category.id,
    };
    const product = await productsRepository.create(productData);

    expect(product.name).toBe("Harry Potter");
    expect(product).toHaveProperty("id");
    expect(product.category_id).toBe(category.id);
  });

  it("should not be able to create an existing product", async () => {
    const productData: Product = {
      name: "Senhor dos Anéis",
      bar_code: "111111111",
      price: 15.99,
      category_id: category.id,
    };

    await productsRepository.create(productData);

    await expect(productsRepository.create(productData)).rejects.toThrowError(
      "Product already exists!"
    );
  });
});
