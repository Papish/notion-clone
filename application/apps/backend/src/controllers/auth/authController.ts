import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createJwtToken } from "../../utils/jwt";
import {
  createUser,
  getUsers,
  userExistByEmail,
} from "../../services/user.service";
import z from "zod";

const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least of 6 characters")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
      message:
        "Password must contain at least one uppercase letter, one number, and one special character.",
    }),
});

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // validate body with zod
    // find the user
    // if session already exist and valid
    // return error
    // else create token, session, cookie
    const users = await getUsers();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userExistByEmail(email);

    if (existingUser) {
      res.status(409).json({ message: "Email is already taken" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      email,
      password: hashedPassword,
      name,
    });

    const token = createJwtToken(user);

    res.status(200).cookie("", {});
  } catch (err) {
    next(err);
  }
};
