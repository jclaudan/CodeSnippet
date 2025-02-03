import prisma from "../prisma/index.js";

export const getPublicSnippets = async (req, res) => {
  try {
    const userId = req.user?.userId;
    console.log("UserId actuel:", userId);

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
        likes: true,
        bookmarks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const snippetsWithInfo = await Promise.all(
      snippets.map(async (snippet) => {
        let isLiked = false;
        let isBookmarked = false;
        let likesCount = 0;

        try {
          if (userId) {
            // Vérifier si userId existe
            const existingLike = await prisma.snippetLike.findUnique({
              where: {
                userId_snippetId: {
                  userId: userId,
                  snippetId: snippet.id,
                },
              },
            });
            isLiked = !!existingLike;

            // Vérifier le bookmark
            const existingBookmark = await prisma.snippetBookmark.findUnique({
              where: {
                userId_snippetId: {
                  userId: userId,
                  snippetId: snippet.id,
                },
              },
            });
            isBookmarked = !!existingBookmark;
          }

          likesCount = await prisma.snippetLike.count({
            where: {
              snippetId: snippet.id,
            },
          });
        } catch (error) {
          console.error("Erreur lors de la vérification des likes:", error);
        }

        return {
          ...snippet,
          isLiked,
          isBookmarked,
          likesCount,
        };
      })
    );

    console.log("Snippets envoyés:", snippetsWithInfo);
    res.json(snippetsWithInfo);
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
