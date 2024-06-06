/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { authentication } from "@Middlewares/index";
import { getAllVehiclesController } from "@Vehicle/infrastructure/dependencias";
import { Router } from "express";

class VehicleRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get(
      "/parking/:idParking",
      [authentication.tokenValidation],
      getAllVehiclesController.run.bind(getAllVehiclesController)
    );
  }
}

const vehicleRouter = new VehicleRouter();
export default vehicleRouter.router;
