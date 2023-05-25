import { Router } from "express";
import { CategoryService } from "../services";

export default class CategoryController {
  public router = Router();
  public path = "/category";
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router.post(`${this.path}`, this.categoryService.create);
  }
}
