/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { authentication } from "@Middlewares/index";
import { validateDTO } from "@Middlewares/validateDTO";
import {
  VehicleCreateDTO,
  VehicleOutParkingDTO
} from "@Vehicle/DTO/vehicle.dto";
import {
  addVehicleController,
  exitVehicleController,
  getAllPaginateVehicleController,
  getAllVehiclesController
} from "@Vehicle/infrastructure/dependencias";
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

    this.router.get(
      "/p/:idParking",
      [authentication.tokenValidation],
      getAllPaginateVehicleController.run.bind(getAllPaginateVehicleController)
    );

    this.router.post(
      "/",
      [
        authentication.tokenValidation,
        authentication.isSocio,
        validateDTO(VehicleCreateDTO)
      ],
      addVehicleController.run.bind(addVehicleController)
    );

    this.router.post(
      "/exit",
      [
        authentication.tokenValidation,
        authentication.isSocio,
        validateDTO(VehicleOutParkingDTO)
      ],
      exitVehicleController.run.bind(exitVehicleController)
    );
  }
}

const vehicleRouter = new VehicleRouter();
export default vehicleRouter.router;
