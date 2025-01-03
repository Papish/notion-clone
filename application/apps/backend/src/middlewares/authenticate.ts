import { RequestHandler } from "express";
import { AUTH_COOKIE } from "../constants";
import { verifyJwtToken } from "../utils";

export const authenticate: RequestHandler = async (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE];

  if (!token) {
    res.status(401).json({ message: "token not found" });
    return;
  }

  try {
    const decodedToken = verifyJwtToken(token);
    // @ts-ignore
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    next(err);
  }
};
