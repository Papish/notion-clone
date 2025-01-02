import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AuthVerificationError } from "../utils/appError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AuthVerificationError) {
    res.status(401).json({
      statusCode: 401,
      message: err.message,
      errors: [],
    });

    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      statusCode: 400,
      message: "400, Bad Request",
      errors: err.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });

    return;
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    statusCode,
    message: "Internal Server Error",
    errors: [],
  });
};
