import { database } from "config";
import { PostgrePrismaUserRepository } from "./repository/postgre-prisma-user.repository";
import { UserApp } from "@User/application/user";
import { GetAllUserController } from "./controllers/getAll-users.controller";
import { GetAllPaginateUsersController } from "./controllers/getAllPaginate-users.controller";
import { GetOneByIdUserController } from "./controllers/getOneById-user.controller";
import { GetProfileController } from "./controllers/getProfile.controller";
import { UpdateUserController } from "./controllers/update-user.controller";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getRepository = () => {
  switch (database.name) {
    case "postgres":
      return new PostgrePrismaUserRepository();
    default:
      throw new Error("Invalid database type");
  }
};

export const user = new UserApp(getRepository());

export const getAllUserController = new GetAllUserController(user);
export const getAllPaginateUsersController = new GetAllPaginateUsersController(
  user
);
export const getOneByIdUserController = new GetOneByIdUserController(user);
export const getProfileController = new GetProfileController(user);
export const updateUserController = new UpdateUserController(user);
