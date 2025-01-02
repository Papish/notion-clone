import { Router } from "express";
import * as authController from "./authController";
import * as profileController from "./profileController";
import { authenticate } from "../middleware/authenticate";

const apiRoutes = Router();

apiRoutes.post("/auth/login", authController.login);
apiRoutes.post("/auth/register", authController.register);

apiRoutes.get("/user/profile", authenticate, profileController.profile);

export default apiRoutes;
