import {
  getTasks,
  addTask,
  modifyTask,
  removeTask,
} from "../services/taskService.js";
import prisma from "../prisma/index.js";

export const getAllTasks = async (req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
};

export const createTask = async (req, res) => {
  try {
    const taskData = req.body;

    if (!req.user || !req.user.userId) {
      console.error("User not authenticated");
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    if (!taskData.title) {
      return res.status(400).json({ error: "Le titre est requis" });
    }

    const userId = req.user.userId;
    console.log("Creating task for user:", userId);

    const task = await addTask(taskData, userId);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      error: "Error creating task",
      details: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedTask = await modifyTask(id, { title, description });
  res.status(203).json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  // Récupérer la tâche pour vérifier l'utilisateur
  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  // Vérifier si la tâche existe et si l'utilisateur a le droit de la supprimer
  if (!task) {
    return res.status(404).json({ error: "Tâche non trouvée" });
  }

  if (task.userId !== req.user.userId) {
    return res.status(403).json({
      error: "Accès refusé : vous ne pouvez pas supprimer cette tâche",
    });
  }

  await removeTask(id);
  res.status(204).send();
};
