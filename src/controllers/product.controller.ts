import { Router } from "express";
import { ProductService } from "../services";

export default class ProductController {
  public router = Router();
  public path = "/product";
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router.post(`${this.path}`, this.productService.create);
    this.router.get(`${this.path}/:product_id`, this.productService.find);
  }
}
