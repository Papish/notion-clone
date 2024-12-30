import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import swaggerDoc from "./swagger/swagger-output.json";
import { authRoutes } from "./api";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/auth", authRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  process.env.NODE_ENV === "development" ? console.error(err.stack) : "";
  
  res.status(statusCode).json({
    statusCode,
    message: "Internal Server Error",
  });
});

export default app;
