import { Request } from "express";
import { SessionUser } from "./";

declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}

export {};
