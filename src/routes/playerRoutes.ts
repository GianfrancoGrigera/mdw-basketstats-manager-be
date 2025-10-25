import express from "express";
import controller from "../controllers/playerController";
import { authenticateFirebase } from "../middlewares/firebaseAuth";

const router = express.Router();

// Públicas
router.get("/", controller.getPlayers);
router.get("/:id", controller.getPlayerById);

// Privadas
router.post("/", authenticateFirebase, controller.createPlayer);
router.put("/:id", authenticateFirebase, controller.updatePlayer);
router.delete("/:id", authenticateFirebase, controller.deletePlayer);

export default router;