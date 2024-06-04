import { jwtSecret } from "config";
import jwt from "jsonwebtoken";

export function generateToken(
  data: string | object,
  expiresIn: number
): string {
  return jwt.sign(data, jwtSecret, { expiresIn: `${expiresIn}h` });
}

export function verifyToken<T>(token: string): T {
  return jwt.verify(token, jwtSecret) as T;
}
