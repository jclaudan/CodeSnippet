import prisma from "../prisma/index.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

export const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        googleAvatar: true,
        githubAvatar: true,
        provider: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur profil:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateUserAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier fourni" });
    }

    console.log("File received:", req.file);

    // Créer un stream à partir du buffer
    const stream = Readable.from(req.file.buffer);

    // Upload vers Cloudinary via stream
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "avatars",
          transformation: [
            { width: 250, height: 250, crop: "fill", gravity: "face" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.pipe(uploadStream);
    });

    const result = await uploadPromise;
    console.log("Upload result:", result);

    // Mettre à jour l'avatar dans la base de données
    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: { avatar: result.secure_url },
      select: {
        id: true,
        avatar: true,
      },
    });

    console.log("Updated user:", updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error("Erreur upload avatar:", error);
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'avatar",
      error: error.message,
    });
  }
};

export const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Le nom d'utilisateur est requis" });
    }

    // Vérifier si le nom d'utilisateur est déjà pris
    const existingUser = await prisma.user.findFirst({
      where: {
        username: username,
        NOT: {
          id: req.user.userId,
        },
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Ce nom d'utilisateur est déjà pris" });
    }

    // Mettre à jour le nom d'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: { username },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        googleAvatar: true,
        githubAvatar: true,
        provider: true,
        createdAt: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Erreur mise à jour username:", error);
    res.status(500).json({
      message: "Erreur lors de la mise à jour du nom d'utilisateur",
      error: error.message,
    });
  }
};
