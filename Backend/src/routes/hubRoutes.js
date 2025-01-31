import express from "express";
import { getPublicSnippets } from "../controllers/hubController.js";

const router = express.Router();

router.get("/public", getPublicSnippets);

export default router;
