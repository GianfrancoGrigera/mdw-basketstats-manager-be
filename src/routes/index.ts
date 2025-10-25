import express from "express";
import user from "./userRoutes";
import auth from "./authRoutes";
import league from "./leagueRoutes";
import team from "./teamRoutes";
import teamLeague from "./teamLeagueRoutes";
import player from "./playerRoutes";
import playerTeam from "./playerTeamRoutes";

const router = express.Router();

router.use("/user", user);
router.use("/auth", auth);
router.use("/league", league);
router.use("/team", team)
router.use("/team-league", teamLeague);
router.use("/player", player);
router.use("/player-team", playerTeam);

export default router;