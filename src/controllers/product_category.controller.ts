import { Router } from "express";
import { ProductCategoryService } from "../services";

export default class ProductCategoryController {
  public router = Router();
  public path = "/product_category";
  private productCategoryService: ProductCategoryService;

  constructor() {
    this.productCategoryService = new ProductCategoryService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router.post(`${this.path}`, this.productCategoryService.create);
  }
}
