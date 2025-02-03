import express from "express";
import { authenticateToken } from "../modules/authMiddleware.js";
import { getPublicSnippets } from "../controllers/hubController.js";
import { toggleLike } from "../controllers/likeController.js";
import {
  toggleBookmark,
  getBookmarkedSnippets,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.get("/public", authenticateToken, getPublicSnippets);
router.post("/snippets/:snippetId/like", authenticateToken, toggleLike);
router.post("/snippets/:snippetId/bookmark", authenticateToken, toggleBookmark);
router.get("/bookmarks", authenticateToken, getBookmarkedSnippets);

export default router;
