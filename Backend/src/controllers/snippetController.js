import {
  addSnippet,
  modifySnippet,
  removeSnippet,
  getSnippets,
} from "../services/snippetService.js";
import prisma from "../prisma/index.js";

export const getAllSnippets = async (req, res) => {
  const snippets = await getSnippets();
  res.json(snippets);
};

export const createSnippet = async (req, res) => {
  try {
    const snippetData = req.body;

    if (!req.user || !req.user.userId) {
      console.error("User not authenticated");
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    if (!snippetData.title) {
      return res.status(400).json({ error: "Le titre est requis" });
    }

    const userId = req.user.userId;
    console.log("Creating snippet for user:", userId);

    const snippet = await addSnippet(snippetData, userId);
    res.status(201).json(snippet);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      error: "Error creating task",
      details: error.message,
    });
  }
};

export const updateSnippet = async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  const updatedSnippet = await modifySnippet(id, {
    title,
    description,
    category,
  });
  res.status(203).json(updatedSnippet);
};

export const deleteSnippet = async (req, res) => {
  const { id } = req.params;

  // Récupérer la tâche pour vérifier l'utilisateur
  const snippet = await prisma.snippet.findUnique({
    where: { id: Number(id) },
  });

  // Vérifier si la tâche existe et si l'utilisateur a le droit de la supprimer
  if (!snippet) {
    return res.status(404).json({ error: "Snippet non trouvée" });
  }

  if (snippet.userId !== req.user.userId) {
    return res.status(403).json({
      error: "Accès refusé : vous ne pouvez pas supprimer ce snippet",
    });
  }

  await removeSnippet(id);
  res.status(204).send();
};

export const getUserSnippets = async (req, res) => {
  const userId = req.params.userId; // Récupérer l'ID utilisateur depuis les paramètres de la requête
  const snippets = await prisma.snippet.findMany({
    where: { userId: Number(userId) }, // Filtrer les snippets par userId
  });
  res.json(snippets);
};
