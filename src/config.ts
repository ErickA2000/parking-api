import type { CorsOptions } from "cors";

export const server = {
  port: (process.env.PORT ?? "") !== "" ? process.env.PORT : 3000
};

export const corsOptions: CorsOptions = {
  origin: getOrigins()
};

export const database = {
  name:
    process.env.DATABASE === undefined || process.env.DATABASE === ""
      ? "postgres"
      : process.env.DATABASE
};

export const jwtSecret =
  process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === ""
    ? "jwtSecretTest"
    : process.env.JWT_SECRET;

function getOrigins(): string[] {
  const origins = process.env.ORIGINS;

  if (origins !== undefined) {
    const arrayOrigins = origins.split(",");
    return arrayOrigins;
  } else {
    return ["*"];
  }
}
