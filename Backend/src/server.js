import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import snippetRoutes from "./routes/snippetRoutes.js";
import { createNewUser, signin } from "./handlers/user.js";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

app.post("/user", createNewUser);
app.post("/signin", signin);
app.use("/snippets", snippetRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
