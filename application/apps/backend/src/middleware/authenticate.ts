import { RequestHandler } from "express";
import { AUTH_ACCESS_TOKEN } from "../constant";
import { verifyJwtToken } from "../utils/jwt";

export const authenticate: RequestHandler = async (req, res, next) => {
  const token = req.cookies[AUTH_ACCESS_TOKEN];

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
