import express from "express";
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

router.get("/profile", getUserProfile);
router.post("/avatar", upload.single("avatar"), updateUserAvatar);

export default router;
