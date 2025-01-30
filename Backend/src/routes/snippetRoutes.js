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

// Route qui récupère uniquement les snippets de l'utilisateur authentifié
router.get("/", getUserSnippets);

// Autres routes pour créer, mettre à jour et supprimer les snippets
router.post("/", createSnippet);
router.put("/:id", updateSnippet);
router.delete("/:id", deleteSnippet);

export default router;
