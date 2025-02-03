import express from "express";
import { authenticateToken } from "../modules/authMiddleware.js";
import {
  getUserProfile,
  updateUserAvatar,
} from "../controllers/userController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

const router = express.Router();

router.use(authenticateToken);
router.get("/profile", authenticateToken, getUserProfile);
router.post(
  "/avatar",
  authenticateToken,
  upload.single("avatar"),
  updateUserAvatar
);

export default router;
