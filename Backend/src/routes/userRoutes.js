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
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Le fichier doit être une image"), false);
    }
  },
});

const router = express.Router();

router.get("/profile", authenticateToken, getUserProfile);
router.post(
  "/avatar",
  authenticateToken,
  upload.single("avatar"),
  (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({
        message: "Erreur lors de l'upload",
        error: error.message,
      });
    }
    next(error);
  },
  updateUserAvatar
);

export default router;
