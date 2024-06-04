/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CODES_HTTP } from "@Constants/global";
import { type ClassConstructor, plainToClass } from "class-transformer";
import { type ValidationError, validate } from "class-validator";
import type { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateDTO(dtoClass: ClassConstructor<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(dtoClass, req.body);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints ?? {}).join(", "))
        .join("; ");

      return res.status(CODES_HTTP.BAD_REQUEST).json({
        message: messages
      });
    } else {
      req.body = dto;
      next();
    }
  };
}
