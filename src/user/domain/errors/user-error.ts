import { CODES_HTTP } from "@Constants/global";

export class UserError extends Error {
  public status: number;

  constructor(options: Options, id = "") {
    const MESSAGES = {
      get: {
        message: "User not found " + id,
        status: CODES_HTTP.NO_FOUND
      },
      create: {
        message: "Error adding",
        status: CODES_HTTP.BAD_REQUEST
      },
      update: {
        message: "Error updating",
        status: CODES_HTTP.BAD_REQUEST
      },
      delete: {
        message: "Error deleting",
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
  method: "get" | "create" | "update" | "delete";
}
