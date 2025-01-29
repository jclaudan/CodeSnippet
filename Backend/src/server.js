import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import snippetRoutes from "./routes/snippetRoutes.js";
import { createNewUser, signin } from "./handlers/user.js";

dotenv.config();
const app = express();

// Configuration de CORS
const corsOptions = {
  origin: "https://code-snippet-mocha.vercel.app", // L'URL de ton frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Appliquer CORS à toutes les routes
app.use(cors(corsOptions));

app.use(express.json());

// Route pour vérifier la disponibilité avec Uptime Robot
app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

app.post("/user", createNewUser);
app.post("/signin", signin);
app.use("/snippets", snippetRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
