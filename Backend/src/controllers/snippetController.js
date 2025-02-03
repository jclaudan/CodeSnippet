import prisma from "../prisma/index.js";
import * as snippetService from "../services/snippetService.js";

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
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        isPublic: true,
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
  try {
    await snippetService.deleteSnippet(req.params.id, req.user.userId);
    res.status(200).json({ message: "Snippet supprimé avec succès" });
  } catch (error) {
    if (error.message === "Snippet non trouvé") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Non autorisé") {
      return res.status(403).json({ message: error.message });
    }
    console.error("Erreur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getUserSnippets = async (req, res) => {
  try {
    const snippets = await snippetService.getSnippets(req.user.userId);
    res.json(snippets);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
