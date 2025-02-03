import express from "express";
import {
  getUserProfile,
  updateUserAvatar,
  updateUsername,
} from "../controllers/userController.js";
import multer from "multer";
import { authenticateToken } from "../modules/authMiddleware.js";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

const router = express.Router();

router.get("/profile", getUserProfile);
router.post("/avatar", upload.single("avatar"), updateUserAvatar);
router.put("/update-username", authenticateToken, updateUsername);

export default router;
