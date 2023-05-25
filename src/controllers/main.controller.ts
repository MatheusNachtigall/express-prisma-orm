import { Router } from "express";
import { MainService } from "../services";

export default class MainController {
  public router = Router();
  public path = "/";
  private mainService: MainService;

  constructor() {
    this.mainService = new MainService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router.get(`${this.path}`, this.mainService.find);
  }
}
