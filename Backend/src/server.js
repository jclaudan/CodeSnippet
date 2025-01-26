import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import { createNewUser, signin } from "./handlers/user.js";

dotenv.config();
const app = express();

app.use(express.json());

app.post("/user", createNewUser);
app.post("/signin", signin);
app.use("/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
