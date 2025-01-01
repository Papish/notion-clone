import { NextFunction, Request, Response } from "express";
import { AuthVerificationError } from "../utils/authError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  if (err instanceof AuthVerificationError) {
    res.status(statusCode).json({
      statusCode,
      message: "401, user unauthorized",
    });

    return;
  }

  res.status(statusCode).json({
    statusCode,
    message: "Internal Server Error",
  });
};
