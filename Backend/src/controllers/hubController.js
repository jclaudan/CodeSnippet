import prisma from "../prisma/index.js";

export const getPublicSnippets = async (req, res) => {
  try {
    const snippets = await prisma.snippet.findMany({
      where: {
        isPublic: true,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
            googleAvatar: true,
            githubAvatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(snippets);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const toggleSnippetVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Vérifier que l'utilisateur est propriétaire du snippet
    const snippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!snippet) {
      return res.status(404).json({ error: "Snippet non trouvé" });
    }

    if (snippet.userId !== userId) {
      return res.status(403).json({ error: "Non autorisé" });
    }

    const updatedSnippet = await prisma.snippet.update({
      where: { id },
      data: {
        isPublic: !snippet.isPublic,
      },
    });

    res.json(updatedSnippet);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du changement de visibilité" });
  }
};
