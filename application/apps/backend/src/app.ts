import express from "express";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import swaggerDoc from "./swagger/swagger-output.json";
import { authRoutes } from "./api";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/auth", authRoutes);

export default app;
