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

export const likeSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Vérifier si l'utilisateur a déjà liké ce snippet
    const existingLike = await prisma.snippetLike.findUnique({
      where: {
        userId_snippetId: {
          userId: userId,
          snippetId: id,
        },
      },
    });

    if (existingLike) {
      return res.status(400).json({ message: "Snippet déjà liké" });
    }

    // Créer le like et incrémenter le compteur dans une transaction
    const [like, updatedSnippet] = await prisma.$transaction([
      // Créer l'enregistrement du like
      prisma.snippetLike.create({
        data: {
          userId: userId,
          snippetId: id,
        },
      }),
      // Incrémenter le compteur de likes
      prisma.snippet.update({
        where: { id },
        data: {
          likes: {
            increment: 1,
          },
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
      }),
    ]);

    res.json(updatedSnippet);
  } catch (error) {
    console.error("Erreur lors du like:", error);
    res.status(500).json({ error: "Erreur lors du like du snippet" });
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
