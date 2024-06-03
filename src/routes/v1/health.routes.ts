import { Router } from "express";
import { healthController } from "./dependencies";

class HealthRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get("/", healthController.run.bind(healthController));
  }
}

const healthRoutes = new HealthRoutes();
export default healthRoutes.router;
