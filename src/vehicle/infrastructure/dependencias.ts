/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { database } from "config";
import { PostgrePrismaVehicleRepository } from "./repository/postgre-prisma-vehicle.repository";
import { VehicleApp } from "@Vehicle/application/vehicle";
import { parking } from "@Parking/infrastructure/dependencies";
import { GetAllVehiclesController } from "./controllers/getAll-vehicles.controller";
import { history } from "@History/infrastructure/dependencies";
import { AddVehicleController } from "./controllers/add-vehicle.controller";
import { ExitVehicleController } from "./controllers/exit-vehicle.controller";
import { GetAllPaginateVehicleController } from "./controllers/getAllPaginate-vehicle.controller";

const getRepository = () => {
  switch (database.name) {
    case "postgres":
      return new PostgrePrismaVehicleRepository();
    default:
      throw new Error("invalid database type");
  }
};

export const vehicle = new VehicleApp(getRepository(), parking, history);

//* controllers
export const getAllVehiclesController = new GetAllVehiclesController(vehicle);
export const getAllPaginateVehicleController =
  new GetAllPaginateVehicleController(vehicle);
export const addVehicleController = new AddVehicleController(vehicle);
export const exitVehicleController = new ExitVehicleController(vehicle);
