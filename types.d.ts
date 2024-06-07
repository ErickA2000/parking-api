declare namespace Express {
  export interface Request {
    user: {
      user: string;
      role: string;
      roleName: string;
    };
  }
}
