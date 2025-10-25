import express from "express";
import user from "./userRoutes";
import auth from "./authRoutes";
import league from "./leagueRoutes";
import team from "./teamRoutes";

const router = express.Router();

router.use("/user", user);
router.use("/auth", auth);
router.use("/league", league);
router.use("/team", team)

export default router;