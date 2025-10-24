import { Router } from "express";
import controllers from "../controllers/userController";
import { authenticateFirebase } from "../middlewares/firebaseAuth";

const router = Router();

router.post("/", controllers.registerUser);
router.get("/", authenticateFirebase, controllers.getUsers);
router.get("/:id", authenticateFirebase, controllers.getUserById);
router.patch("/:id", authenticateFirebase, controllers.updateUser);
router.delete("/soft/:id", authenticateFirebase, controllers.softDeleteUser);
router.delete("/hard/:id", authenticateFirebase, controllers.hardDeleteUser);

export default router;