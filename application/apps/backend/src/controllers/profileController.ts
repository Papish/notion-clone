import { NextFunction, Request, Response } from "express";
import { UserService } from "../services";

export interface AuthenticatedRequest extends Request {
  user?: number;
}

export const profile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Invalid login session",
      });
      return;
    }

    const user = await UserService.findUserById(req.user);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
