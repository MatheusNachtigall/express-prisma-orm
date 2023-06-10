import App from "./app.config";
import * as bodyParser from "body-parser";
import { simpleRedirectMiddleware } from "./middlewares";
import {
  CategoryController,
  MainController,
  ProductCategoryController,
  ProductController,
} from "./controllers";

const app = new App({
  port: 3000,
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    simpleRedirectMiddleware,
  ],
  controllers: [
    new MainController(),
    new ProductController(),
    new CategoryController(),
    new ProductCategoryController(),
  ],
});

export { app };
