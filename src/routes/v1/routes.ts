import { Router } from "express";
import healthRoutes from "./health.routes";
import roleRoutes from "./role.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import parkingRoutes from "./parking.routes";
import vehicleRoutes from "./vehicle.routes";
import historyRoutes from "./history.routes";

class Routes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.use("/health", healthRoutes);
    this.router.use("/roles", roleRoutes);
    this.router.use("/auth", authRoutes);
    this.router.use("/users", userRoutes);
    this.router.use("/parking", parkingRoutes);
    this.router.use("/vehicles", vehicleRoutes);
    this.router.use("/indicators", historyRoutes);
  }
}

const routes = new Routes();
export default routes.router;
