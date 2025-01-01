import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { AuthVerificationError } from "./authError";

const JWT_PRIVATE_SECRET_KEY = "jwt-secret-key";

export const createJwtToken = (user: User) => {
  return jwt.sign(
    {
      sub: user.id,
      name: user.name,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) * 60 * 60,
    },
    JWT_PRIVATE_SECRET_KEY,
    {
      audience: ["user"],
      expiresIn: "1h",
    },
  );
};

export const verifyJwtToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_PRIVATE_SECRET_KEY);
  } catch (err) {
    throw new AuthVerificationError()
  }
};
