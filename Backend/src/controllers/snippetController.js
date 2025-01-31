import {
  addSnippet,
  modifySnippet,
  removeSnippet,
  getSnippets,
} from "../services/snippetService.js";
import prisma from "../prisma/index.js";

export const createSnippet = async (req, res) => {
  try {
    const { title, description, category, isPublic } = req.body;
    const userId = req.user.userId;

    console.log("Création snippet avec données:", {
      title,
      description,
      category,
      isPublic,
      userId,
    });

    const snippet = await prisma.snippet.create({
      data: {
        title,
        description,
        category,
        isPublic: Boolean(isPublic),
        userId,
        likes: 0,
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        isPublic: true,
        likes: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log("Snippet créé:", snippet);
    res.status(201).json(snippet);
  } catch (error) {
    console.error("Erreur création snippet:", error);
    res.status(500).json({ error: "Erreur lors de la création du snippet" });
  }
};

export const updateSnippet = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, isPublic } = req.body;
  try {
    const updatedSnippet = await prisma.snippet.update({
      where: { id },
      data: {
        title,
        description,
        category,
        isPublic: Boolean(isPublic),
      },
    });
    res.status(200).json(updatedSnippet);
  } catch (error) {
    console.error("Erreur mise à jour snippet:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du snippet" });
  }
};

export const deleteSnippet = async (req, res) => {
  const { id } = req.params;

  // Récupérer la tâche pour vérifier l'utilisateur
  const snippet = await prisma.snippet.findUnique({
    where: { id: id },
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
  try {
    const userId = req.user.userId;
    const snippets = await prisma.snippet.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: true,
      },
    });

    res.json(snippets);
  } catch (error) {
    console.error("Erreur lors de la récupération des snippets:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
