import { Router } from "express";
import controllers from "../controllers/leagueController";
import { authenticateFirebase } from "../middlewares/firebaseAuth";

const router = Router();

// Públicas
router.get("/", controllers.getLeagues);
router.get("/:id", controllers.getLeagueById);

// Privadas
router.post("/", authenticateFirebase, controllers.createLeague);
router.put("/:id", authenticateFirebase, controllers.updateLeague);
router.delete("/:id", authenticateFirebase, controllers.deleteLeague);

export default router;