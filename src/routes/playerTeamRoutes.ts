import express from "express";
import playerTeamController from "../controllers/playerTeamController";
import { authenticateFirebase } from "../middlewares/firebaseAuth";

const router = express.Router();

// Públicas
router.get("/:teamId", playerTeamController.getPlayersByTeam);

// Privadas
router.post("/", authenticateFirebase, playerTeamController.createPlayerTeam);
router.delete("/:id", authenticateFirebase, playerTeamController.deletePlayerTeam);

export default router;
