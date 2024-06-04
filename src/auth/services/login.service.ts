import { AuthError } from "@Auth/errors/auth-errors";
import { generateToken } from "@Helpers/jwt";
import { comparePassword } from "@Helpers/password";
import type { UserApp } from "@User/application/user";

export class LoginService {
  constructor(private readonly user: UserApp) {}

  async login(usuario: string, pass: string): Promise<string> {
    const user = await this.user.findByEmail(usuario);

    const isValidPassword = await comparePassword(pass, user.password);

    if (isValidPassword === false) throw new AuthError({ method: "password" });

    const token = generateToken(
      {
        user: user.id,
        role: user.idRole
      },
      2
    );

    return token;
  }
}
