import { RequestHandler } from "express";
import { UserService } from "../services";
import { AuthVerificationError } from "../utils";

export const profile: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new AuthVerificationError();

    const user = await UserService.findUserById(req.user.userId);
    
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
