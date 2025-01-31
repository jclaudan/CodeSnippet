import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Charger les variables d'environnement au début du fichier
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Ajouter une vérification
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables!");
  process.exit(1); // Arrêter le serveur si la clé secrète n'est pas définie
}

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("Pas de token fourni");
      return res.status(401).json({ message: "Token manquant" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("Erreur de vérification du token:", err);
        return res.status(403).json({ message: "Token invalide" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.log("Erreur d'authentification:", error);
    res.status(401).json({ message: "Erreur d'authentification" });
  }
};
