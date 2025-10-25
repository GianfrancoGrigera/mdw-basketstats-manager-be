import { Router } from "express";
import controllers from "../controllers/teamLeagueController";
import { authenticateFirebase } from "../middlewares/firebaseAuth";

const router = Router();

// Públicas
router.get("/league/:leagueId", controllers.getTeamsByLeague);

// Privadas
router.post("/register", authenticateFirebase, controllers.registerTeamInLeague);
router.delete("/:id", authenticateFirebase, controllers.removeTeamFromLeague);

export default router;