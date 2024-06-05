/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { authentication } from "@Middlewares/index";
import { validateDTO } from "@Middlewares/validateDTO";
import { ParkingCreateDTO, ParkingUpdateDTO } from "@Parking/DTO/parking.dto";
import {
  createParkingController,
  deleteParkingController,
  getAllParkingController,
  getOneByIdParkingController,
  updateParkingController
} from "@Parking/infrastructure/dependencies";
import { Router } from "express";

class ParkingRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get(
      "/",
      [authentication.tokenValidation],
      getAllParkingController.run.bind(getAllParkingController)
    );
    this.router.get(
      "/one/:id",
      [authentication.tokenValidation],
      getOneByIdParkingController.run.bind(getOneByIdParkingController)
    );
    this.router.post(
      "/",
      [
        authentication.tokenValidation,
        authentication.isAdmin,
        validateDTO(ParkingCreateDTO)
      ],
      createParkingController.run.bind(createParkingController)
    );
    this.router.patch(
      "/:id",
      [
        authentication.tokenValidation,
        authentication.isAdmin,
        validateDTO(ParkingUpdateDTO)
      ],
      updateParkingController.run.bind(updateParkingController)
    );
    this.router.delete(
      "/:id",
      [authentication.tokenValidation, authentication.isAdmin],
      deleteParkingController.run.bind(deleteParkingController)
    );
  }
}

const parkingRouter = new ParkingRouter();
export default parkingRouter.router;
