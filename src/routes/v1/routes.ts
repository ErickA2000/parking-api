import { Router } from "express";
import healthRoutes from "./health.routes";
import roleRoutes from "./role.routes";
import authRoutes from "./auth.routes";

class Routes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.use("/health", healthRoutes);
    this.router.use("/roles", roleRoutes);
    this.router.use("/auth", authRoutes);
  }
}

const routes = new Routes();
export default routes.router;
