import express from "express";
import { getPublicSnippets } from "../controllers/hubController.js";
import { toggleLike } from "../controllers/likeController.js";
import {
  toggleBookmark,
  getBookmarkedSnippets,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.get("/public", getPublicSnippets);
router.post("/snippets/:snippetId/like", toggleLike);
router.post("/snippets/:snippetId/bookmark", toggleBookmark);
router.get("/bookmarks", getBookmarkedSnippets);

export default router;
