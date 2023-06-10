import { describe } from "node:test";
import { CategoriesRepositoryInMemory } from "../repository";
import { Category } from "../entities";

describe("Create Category", () => {
  // let categoriesRepository: CategoriesRepositoryInMemory;
  // beforeAll(() => {
  //   categoriesRepository = new CategoriesRepositoryInMemory();
  // });
  // it("should create a new category", async () => {
  //   const categoryData: Category = { name: "Eletrônicos" };
  //   const category = await categoriesRepository.create(categoryData);
  //   expect(category.name).toBe("Eletrônicos");
  //   expect(category).toHaveProperty("id");
  // });
  // it("should not be able to create an existing category", async () => {
  //   const categoryData: Category = { name: "Lazer" };
  //   await categoriesRepository.create(categoryData);
  //   await expect(
  //     categoriesRepository.create(categoryData)
  //   ).rejects.toThrowError("Category already exists!");
  // });
});
