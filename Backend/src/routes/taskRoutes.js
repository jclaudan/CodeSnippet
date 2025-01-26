import express from "express";
import { authenticateToken } from "../modules/authMiddleware.js";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Protéger toutes les routes avec l'authentification
router.use(authenticateToken);

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
