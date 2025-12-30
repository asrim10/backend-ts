import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

let authController = new AuthController();
const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// add remaininng auth routes like login, logout here

export default router;
