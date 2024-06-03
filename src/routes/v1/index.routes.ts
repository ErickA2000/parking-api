import { Router } from "express";
import routes from "./routes";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.use("/v1", routes);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
