/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { database } from "config";
import { PostgrePrismaParkingRepository } from "./repository/postgre-prisma-parking.repository";
import { ParkingApp } from "@Parking/application/parking";
import { user } from "@User/infrastructure/dependencies";
import { GetAllParkingController } from "./controllers/getAll-Parking.controller";
import { GetOneByIdParkingController } from "./controllers/getOneByid-parking.controller";
import { CreateParkingController } from "./controllers/create-parking.controller";
import { UpdateParkingController } from "./controllers/update-parking.controller";
import { DeleteParkingController } from "./controllers/delete-parking.controller";

const getRepository = () => {
  switch (database.name) {
    case "postgres":
      return new PostgrePrismaParkingRepository();
    default:
      throw new Error("Invalid database type");
  }
};

export const parking = new ParkingApp(getRepository(), user);

//* controllers
export const getAllParkingController = new GetAllParkingController(parking);
export const getOneByIdParkingController = new GetOneByIdParkingController(
  parking
);
export const createParkingController = new CreateParkingController(parking);
export const updateParkingController = new UpdateParkingController(parking);
export const deleteParkingController = new DeleteParkingController(parking);
