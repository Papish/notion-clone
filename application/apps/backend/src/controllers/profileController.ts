import { NextFunction, Request, Response } from "express";
import { UserService } from "../services";
import { get } from "lodash";

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionId = get(req, "user.userId") as unknown as number;
    const user = await UserService.findUserById(sessionId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
