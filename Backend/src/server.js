import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";
import snippetRoutes from "./routes/snippetRoutes.js";
import { createNewUser, signin } from "./handlers/user.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Logger personnalisé
const logger = (req, res, next) => {
  // En production, logger uniquement les erreurs
  if (process.env.NODE_ENV === "production") {
    const oldSend = res.send;
    res.send = function (data) {
      if (res.statusCode >= 400) {
        console.error(
          `[ERROR] ${req.method} ${req.url} - Status: ${res.statusCode}`
        );
      }
      oldSend.apply(res, arguments);
    };
  } else {
    // En développement, logger de manière concise
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
};

// Désactiver les logs de session en production
if (process.env.NODE_ENV === "production") {
  console.debug = () => {};
  console.log = () => {};
  console.info = () => {};
}

// Configuration CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(logger); // Ajouter le logger après le parsing du body

// Configuration de la session avec moins de logs
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
    name: "sessionId",
    rolling: true,
    logErrors: process.env.NODE_ENV !== "production",
  })
);

// Initialisation de Passport
app.use(passport.initialize());

// Route pour vérifier la disponibilité avec Uptime Robot
app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

// Routes
app.post("/user", createNewUser);
app.post("/signin", signin);
app.use("/snippets", snippetRoutes);
app.use("/auth", authRoutes);

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    console.error(`[ERROR] ${err.message}`);
    res.status(500).json({ message: "Erreur serveur" });
  } else {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});
