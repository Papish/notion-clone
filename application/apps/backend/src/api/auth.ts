import express, { Request, Response, NextFunction } from "express";
import db from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRoutes = express.Router();

const JWT_SECRET = "jwt-secret-key";

authRoutes.get("/login", async (req, res) => {
  const users = await db.user.findMany();
  res.status(200).json({ users });
});

authRoutes.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await db.user.findUnique({ where: { email } });

      if (existingUser) {
        res.status(409).json({ statusCode: 409, message: "Email is already taken" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await db.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      const access_token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login successful", token: access_token });
    } catch (err) {
      console.log(err)
      next(err);
    }
  },
);

export { authRoutes };
