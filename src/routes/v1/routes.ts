import { Router } from "express";
import healthRoutes from "./health.routes";
import roleRoutes from "./role.routes";

class Routes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.use("/health", healthRoutes);
    this.router.use("/roles", roleRoutes);
  }
}

const routes = new Routes();
export default routes.router;
