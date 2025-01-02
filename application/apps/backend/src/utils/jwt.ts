import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthVerificationError } from "./appError";

const JWT_PRIVATE_SECRET_KEY = "jwt-secret-key";

export const createJwtToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) * 60 * 60,
    },
    JWT_PRIVATE_SECRET_KEY,
    {
      audience: ["user"],
    },
  );
};

interface TokenPayload extends JwtPayload {
  userId: number;
}

export const verifyJwtToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_PRIVATE_SECRET_KEY) as TokenPayload;
  } catch (err) {
    throw new AuthVerificationError();
  }
};
