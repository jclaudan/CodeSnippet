import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import snippetRoutes from "./routes/snippetRoutes.js";
import { createNewUser, signin } from "./handlers/user.js";

dotenv.config();
const app = express();

// Configuration CORS
const corsOptions = {
  origin: ["https://code-snippet-mocha.vercel.app"], // Ajoute ici les domaines autorisés
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
  credentials: true, // Permet les cookies (si nécessaire)
};

// Appliquer CORS à toutes les routes
app.use(cors(corsOptions));

app.use(express.json());

app.post("/user", createNewUser);
app.post("/signin", signin);
app.use("/snippets", snippetRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
