import express from "express";
import user from "./userRoutes";
import auth from "./authRoutes";

const router = express.Router();

router.use("/user", user);
router.use("/auth", auth);

export default router;