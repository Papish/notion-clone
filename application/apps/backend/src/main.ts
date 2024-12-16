import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger/swagger.json";

dotenv.config();

const app = express();
app.use(express.json());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.get("/api/users", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

export default app;
