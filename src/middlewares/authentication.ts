/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CODES_HTTP } from "@Constants/global";
import { verifyToken } from "@Helpers/jwt";
import type { Payload } from "@Interfaces/global.interface";
import type { NextFunction, Request, Response } from "express";
import { prisma } from "prisma";

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractTokenFromHeader(req);
  if (token === undefined) {
    return res.status(CODES_HTTP.UNAUTHORIZED).json({
      message: "Acceso denegado"
    });
  }

  try {
    const payload = verifyToken<Payload>(token);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(CODES_HTTP.UNAUTHORIZED).json({
      message: "Token no valido"
    });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: req.user.role
      }
    });

    if (role === null) throw new Error("null");

    if (role.name !== "admin") {
      return res.status(CODES_HTTP.FORBIDDEN).json({
        message: "Acceso prohibido"
      });
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "null") {
        return res.status(CODES_HTTP.BAD_REQUEST).json({
          message: "Acceso denegado"
        });
      }
    }

    return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
      message: error.message
    });
  }
};

export const isSocio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: req.user.role
      }
    });

    if (role === null) throw new Error("null");

    if (role.name !== "socio") {
      return res.status(CODES_HTTP.FORBIDDEN).json({
        message: "Acceso prohibido"
      });
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "null") {
        return res.status(CODES_HTTP.BAD_REQUEST).json({
          message: "Acceso denegado"
        });
      }
    }

    return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
      message: error.message
    });
  }
};

function extractTokenFromHeader(request: Request): string | undefined {
  if (request.headers.authorization === undefined) return undefined;

  const [type, token] = request.headers.authorization.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
}
