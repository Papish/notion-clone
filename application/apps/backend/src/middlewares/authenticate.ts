import { RequestHandler } from "express";
import { AUTH_COOKIE } from "../constants";
import { AuthVerificationError, verifyJwtToken } from "../utils";

export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies[AUTH_COOKIE];

    if (!token) {
      throw new AuthVerificationError();
    }

    const decodedToken = verifyJwtToken(token);
    req.user = decodedToken;

    next();
  } catch (err) {
    next(err);
  }
};
