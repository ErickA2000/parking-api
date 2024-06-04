import * as bcryptjs from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcryptjs.compare(password, hash);
}
