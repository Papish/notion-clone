import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AuthVerificationError } from "../utils/appError";

export const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AuthVerificationError) {
    res.status(401).json({
      message: err.message,
    });

    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: "400, Bad Request",
      errors: err.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });

    return;
  }

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};
