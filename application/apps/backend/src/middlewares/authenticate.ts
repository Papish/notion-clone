import { NextFunction, RequestHandler, Response, Request } from "express";
import { AUTH_COOKIE } from "../constants";
import { AuthVerificationError, verifyJwtToken } from "../utils";
import {merge} from 'lodash'

export const authenticate: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies[AUTH_COOKIE];

    if (!token) {
      throw new AuthVerificationError();
    }

    const decodedToken = verifyJwtToken(token);
    merge(req, { user: decodedToken });

    next();
  } catch (err) {
    next(err);
  }
};
