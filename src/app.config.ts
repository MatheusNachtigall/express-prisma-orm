import express, { Application } from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: `${process.env.NODE_ENV ?? ""}.env` });

export default class App {
  public app: Application;
  public port: number;

  constructor(appConfig: { port: number; middlewares: any; controllers: any }) {
    // this.setMongooseConnection();
    // this.setPostgresConnection();
    this.app = express();
    this.port = appConfig.port;
    this.setMiddlewares(appConfig.middlewares);
    this.setControllers(appConfig.controllers);
  }

  private setMiddlewares(middlewares: {
    forEach: (mid: (middleware: any) => void) => void;
  }) {
    middlewares.forEach((mid) => this.app.use(mid));
  }

  private setControllers(controllers: {
    forEach: (con: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => this.app.use("/", controller.router));
  }

  private setMongooseConnection() {}

  private setPostgresConnection() {}

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Express has started on port ${this.port}...`);
    });
  }
}
