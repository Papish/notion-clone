import express from "express";
const authRoutes = express.Router();

authRoutes.get("/login", (req, res) => {
  res.status(200).json({ token: "fake-jwt-token" });
});

authRoutes.post("/register", (req, res) => {
  res.status(200).json({ token: "fake-jwt-token" });
});

export { authRoutes };
