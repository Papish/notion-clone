import { Router } from "express";
import { authenticate } from "../middlewares";
import { AuthController, ProfileController } from "../controllers";

const apiRoutes = Router();

apiRoutes.post("/auth/login", AuthController.login);
apiRoutes.post("/auth/register", AuthController.register);

// Protected
apiRoutes.post("/auth/logout", authenticate, AuthController.logout);
apiRoutes.get("/auth/me", authenticate, AuthController.me);
apiRoutes.get("/user/profile", authenticate, ProfileController.profile);

export default apiRoutes;
