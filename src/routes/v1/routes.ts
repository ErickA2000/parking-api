import { Router } from "express";
import healthRoutes from "./health.routes";

class Routes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.use("/health", healthRoutes);
  }
}

const routes = new Routes();
export default routes.router;
