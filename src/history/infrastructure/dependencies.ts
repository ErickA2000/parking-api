/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { database } from "config";
import { PostgrePrismaHistoryRepository } from "./repository/postgre-prisma-history.repository";
import { HistoryApp } from "@History/application/history";

const getRepository = () => {
  switch (database.name) {
    case "postgres":
      return new PostgrePrismaHistoryRepository();
    default:
      throw new Error("Invalid database type");
  }
};

export const history = new HistoryApp(getRepository());
