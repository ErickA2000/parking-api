/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { database } from "config";
import { PostgrePrismaHistoryRepository } from "./repository/postgre-prisma-history.repository";
import { HistoryApp } from "@History/application/history";
import { parking } from "@Parking/infrastructure/dependencies";
import { GetTopVehiclesAllParkingController } from "./controllers/getTopVehiclesAllParking.controller";
import { GetTopVehiclesOneParkingController } from "./controllers/getTopVehiclesOneParking.controller";
import { GetFirstTimeParkedController } from "./controllers/getFirstTimeParked.controller";
import { EarningsController } from "./controllers/earning.controller";

const getRepository = () => {
  switch (database.name) {
    case "postgres":
      return new PostgrePrismaHistoryRepository();
    default:
      throw new Error("Invalid database type");
  }
};

export const history = new HistoryApp(getRepository(), parking);

//* Controllers
export const getTopVehiclesAllParkingController =
  new GetTopVehiclesAllParkingController(history);
export const getTopVehiclesOneParkingController =
  new GetTopVehiclesOneParkingController(history);
export const getFirstTimeParked = new GetFirstTimeParkedController(history);
export const earningsController = new EarningsController(history);
