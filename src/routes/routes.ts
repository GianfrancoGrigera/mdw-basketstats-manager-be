import express from "express";
import user from "./userRoutes";
import auth from "./authRoutes";
import league from "./leagueRoutes";

const router = express.Router();

router.use("/user", user);
router.use("/auth", auth);
router.use("/league", league);

export default router;