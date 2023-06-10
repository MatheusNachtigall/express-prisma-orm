class Product {
  id?: string;
  name: string;
  bar_code: string;
  price: Number;
  category_id?: string;

  private constructor({ name, bar_code, price, category_id = "" }: Product) {
    return Object.assign(this, {
      name,
      bar_code,
      price,
      category_id,
    });
  }

  static create({ name, bar_code, price, category_id = "" }: Product) {
    const product = new Product({ name, bar_code, price, category_id });
    return product;
  }
}

export { Product };
