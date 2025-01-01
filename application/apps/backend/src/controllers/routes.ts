import { Router } from "express";
import * as authController from "./auth/authController";

const apiRoutes = Router();

apiRoutes.post("/auth/login", authController.login);
apiRoutes.post("/auth/register", authController.register);

export default apiRoutes;
