import { Category } from "../../entities";
import { v4 as uuid } from "uuid";

class CategoriesRepositoryInMemory {
  private categories: Category[] = [];

  async create(category: Category): Promise<Category> {
    const categoryExists = await this.exists(category.name);

    if (categoryExists) {
      throw new Error(`Category already exists!`);
    }

    Object.assign(category, {
      id: uuid(),
    });

    this.categories.push(category);
    return category;
  }

  async exists(categoryName: string): Promise<boolean> {
    const category = this.categories.some(
      (category) => category.name === categoryName
    );
    return category;
  }
}

export { CategoriesRepositoryInMemory };
