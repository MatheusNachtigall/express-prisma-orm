class Category {
  id?: string;
  name: string;

  private constructor({ name }: Category) {
    return Object.assign(this, {
      name,
    });
  }

  static create({ name }: Category) {
    const category = new Category({ name });
    return category;
  }
}

export { Category };
