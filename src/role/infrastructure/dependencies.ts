import { database } from "config";
import { PostgrePrismaRoleRepository } from "./repository/postgre-prisma.repository";
import { RoleApp } from "@Role/application/role";
import { GetAllRoleController } from "./controllers/getAll-role.controller";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getRepository = () => {
  switch (database.name) {
    case "postgres":
      return new PostgrePrismaRoleRepository();
    default:
      throw new Error("Invalid database type");
  }
};

export const role = new RoleApp(getRepository());

export const getAllRoleController = new GetAllRoleController(role);
