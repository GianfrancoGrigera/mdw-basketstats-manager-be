import { Router } from "express";
import controllers from "../controllers/userController";

const router = Router();

router.post("/", controllers.registerUser);
router.get("/", controllers.getUsers);
router.get("/:id", controllers.getUserById);
router.put("/:id", controllers.updateUser);
router.delete("/soft/:id", controllers.softDeleteUser);
router.delete("/hard/:id", controllers.hardDeleteUser);

export default router;