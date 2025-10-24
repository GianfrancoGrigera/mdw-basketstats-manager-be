import { Router } from "express";
import controller from "../controllers/authController";

const router = Router();

router.post("/login", controller.loginWithEmailPassword);

export default router;