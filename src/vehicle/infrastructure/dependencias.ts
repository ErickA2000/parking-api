/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { database } from "config";
import { PostgrePrismaVehicleRepository } from "./repository/postgre-prisma-vehicle.repository";
import { VehicleApp } from "@Vehicle/application/vehicle";
import { parking } from "@Parking/infrastructure/dependencies";
import { GetAllVehiclesController } from "./controllers/getAll-vehicles.controller";

const getRepository = () => {
  switch (database.name) {
    case "postgres":
      return new PostgrePrismaVehicleRepository();
    default:
      throw new Error("invalid database type");
  }
};

export const vehicle = new VehicleApp(getRepository(), parking);

//* controllers
export const getAllVehiclesController = new GetAllVehiclesController(vehicle);
