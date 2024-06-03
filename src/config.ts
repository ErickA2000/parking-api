import type { CorsOptions } from "cors";

export const server = {
  port: (process.env.PORT ?? "") !== "" ? process.env.PORT : 3000
};

export const corsOptions: CorsOptions = {
  origin: getOrigins()
};

function getOrigins(): string[] {
  const origins = process.env.ORIGINS;

  if (origins !== undefined) {
    const arrayOrigins = origins.split(",");
    return arrayOrigins;
  } else {
    return ["*"];
  }
}
