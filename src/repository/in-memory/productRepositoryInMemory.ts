import { Product } from "../../entities";
import { v4 as uuid } from "uuid";

class ProductsRepositoryInMemory {
  private products: Product[] = [];

  async create(product: Product): Promise<Product> {
    const productExists = await this.exists(product.name);

    if (productExists) {
      throw new Error(`Product already exists!`);
    }

    Object.assign(product, {
      id: uuid(),
    });

    this.products.push(product);
    return product;
  }

  async exists(productName: string): Promise<boolean> {
    const product = this.products.some(
      (product) => product.name === productName
    );
    return product;
  }
}

export { ProductsRepositoryInMemory };
