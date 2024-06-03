import express from "express";
import type { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { corsOptions, server } from "./config";
import { queryParser } from "express-query-parser";
import indexRoutes from "@Routes/v1/index.routes";

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.router();
  }

  private config(): void {
    this.app.set("port", server.port);
    this.app
      .use(morgan("dev"))
      .use(cors(corsOptions))
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(
        queryParser({
          parseBoolean: true,
          parseNull: true,
          parseNumber: true,
          parseUndefined: true
        })
      );
  }

  private router(): void {
    this.app.use("/api", indexRoutes);
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server on http://localhost:${server.port}`);
    });
  }
}
