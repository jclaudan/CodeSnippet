import express from "express";
import { authenticateToken } from "../modules/authMiddleware.js";
import {
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getUserSnippets,
} from "../controllers/snippetController.js";

const router = express.Router();
router.use(authenticateToken);

router.post("/", createSnippet);
router.put("/:id", updateSnippet);
router.delete("/:id", deleteSnippet);
router.get("/user/:userId", getUserSnippets);

export default router;
