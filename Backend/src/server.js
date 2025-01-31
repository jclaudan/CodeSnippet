import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";
import snippetRoutes from "./routes/snippetRoutes.js";
import { createNewUser, signin } from "./handlers/user.js";
import authRoutes from "./routes/authRoutes.js";
import hubRoutes from "./routes/hubRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();

// Configuration CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// Configuration de la session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialisation de Passport
app.use(passport.initialize());

// Route pour vérifier la disponibilité avec Uptime Robot
app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

app.post("/user", createNewUser);
app.post("/signin", signin);
app.use("/snippets", snippetRoutes);
app.use("/auth", authRoutes);
app.use("/hub", hubRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
