import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import z from "zod";
import { UserService } from "../services";
import { AUTH_COOKIE } from "../constants";
import { AuthVerificationError, createJwtToken } from "../utils";

const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
      message:
        "Password must contain at least one uppercase letter, one number, and one special character.",
    }),
});

export const login: RequestHandler = async (req, res, next) => {
  try {
    const validData = loginRequestSchema.parse(req.body);

    const user = await UserService.findUserByEmail(validData.email);

    if (!user) {
      res.status(404).json({
        message: "The email provided is not registered yet",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      validData.password,
      user.password,
    );

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Ther user credentials are invalid.",
      });
      return;
    }

    const access_token = createJwtToken(user);

    res.cookie(AUTH_COOKIE, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 10 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
    });
  } catch (err) {
    next(err);
  }
};

const registerRequestSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
      message:
        "Password must contain at least one uppercase letter, one number, and one special character.",
    }),
});

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, name } = registerRequestSchema.parse(req.body);

    const existingUser = await UserService.findUserByEmail(email);

    if (existingUser) {
      res.status(409).json({
        message: "Email is already taken",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserService.createUser({
      email,
      password: hashedPassword,
      name,
    });

    const access_token = createJwtToken(user);

    res.cookie(AUTH_COOKIE, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 1000,
    });

    res.status(200).json({
      message: "User registered",
    });
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  try {
    res.clearCookie(AUTH_COOKIE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const me: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new AuthVerificationError();

    const user = await UserService.findUserById(req.user?.userId);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
