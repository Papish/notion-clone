import { Router } from "express";
import { authenticate } from "../middlewares";
import { AuthController, ProfileController } from "../controllers";

const apiRoutes = Router();

apiRoutes.post("/auth/login", AuthController.login);
apiRoutes.post("/auth/register", AuthController.register);

// Protected
apiRoutes.get("/user/profile", authenticate, ProfileController.profile);

export default apiRoutes;
