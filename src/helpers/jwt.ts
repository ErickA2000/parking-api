import { jwtSecret } from "config";
import jwt from "jsonwebtoken";

/**
 *
 * @param data puede ser una cadena o un objeto
 * @param expiresIn tiempo de expiración del token representado en horas
 * @returns retorna el token
 */
export function generateToken(
  data: string | object,
  expiresIn: number
): string {
  return jwt.sign(data, jwtSecret, { expiresIn: `${expiresIn}h` });
}

export function verifyToken<T>(token: string): T {
  return jwt.verify(token, jwtSecret) as T;
}
