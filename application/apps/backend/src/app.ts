import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import helmet, { noSniff } from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { authRoutes } from "./api";
import swaggerDoc from "./swagger/swagger-output.json";

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    // can be further configured for more security
    contentSecurityPolicy: true,
    frameguard: true,
    noSniff: true,
  }),
);

app.disable("x-powered-by");

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
