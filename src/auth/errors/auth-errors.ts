import { CODES_HTTP } from "@Constants/global";

export class AuthError extends Error {
  public status: number;

  constructor(options: Options) {
    const MESSAGES = {
      password: {
        message: "Invalid password",
        status: CODES_HTTP.BAD_REQUEST
      }
    };

    const MESSAGE_DEFAULT = "Error unknown";

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const error = MESSAGES[options.method].message || MESSAGE_DEFAULT;
    super(error);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    this.status = MESSAGES[options.method].status || 500;
  }
}

interface Options {
  method: "password";
}
