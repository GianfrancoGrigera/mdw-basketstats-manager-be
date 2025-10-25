import { Router } from "express";
import controllers from "../controllers/teamController";
import { authenticateFirebase } from "../middlewares/firebaseAuth";

const router = Router();

// Públicas
router.get("/", controllers.getTeams);
router.get("/:id", controllers.getTeamById)

// Privadas
router.post("/", authenticateFirebase, controllers.createTeam);
router.put("/:id", authenticateFirebase, controllers.updateTeam);
router.delete("/:id", authenticateFirebase, controllers.deleteTeam);

export default router;