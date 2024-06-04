import { database } from "config";
import { PostgrePrismaUserRepository } from "./repository/postgre-prisma-user.repository";
import { UserApp } from "@User/application/user";

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
