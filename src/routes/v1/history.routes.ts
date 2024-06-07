/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  earningsController,
  getFirstTimeParked,
  getTopVehiclesAllParkingController,
  getTopVehiclesOneParkingController
} from "@History/infrastructure/dependencies";
import { authentication } from "@Middlewares/index";
import { Router } from "express";

class HistoryRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get(
      "/top-vehicles",
      [authentication.tokenValidation],
      getTopVehiclesAllParkingController.run.bind(
        getTopVehiclesAllParkingController
      )
    );
    this.router.get(
      "/top-vehicles/:idParking",
      [authentication.tokenValidation],
      getTopVehiclesOneParkingController.run.bind(
        getTopVehiclesOneParkingController
      )
    );
    this.router.get(
      "/vehicles/parking/:idParking",
      [authentication.tokenValidation],
      getFirstTimeParked.run.bind(getFirstTimeParked)
    );
    this.router.get(
      "/earnings/:idParking",
      [authentication.tokenValidation, authentication.isSocio],
      earningsController.run.bind(earningsController)
    );
  }
}

const historyRouter = new HistoryRouter();
export default historyRouter.router;
