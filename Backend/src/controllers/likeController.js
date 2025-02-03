import prisma from "../prisma/index.js";

export const toggleLike = async (req, res) => {
  try {
    const { snippetId } = req.params;
    const userId = req.user.userId;

    console.log("Toggle like pour:", { snippetId, userId });

    const existingLike = await prisma.snippetLike.findUnique({
      where: {
        userId_snippetId: {
          userId: userId,
          snippetId: snippetId,
        },
      },
    });

    let isLiked = false;

    if (existingLike) {
      // Si like existe, on le supprime
      await prisma.snippetLike.delete({
        where: {
          userId_snippetId: {
            userId: userId,
            snippetId: snippetId,
          },
        },
      });
      isLiked = false;
    } else {
      // Si pas de like, on en crée un
      await prisma.snippetLike.create({
        data: {
          userId: userId,
          snippetId: snippetId,
        },
      });
      isLiked = true;
    }

    // Compter le nombre total de likes
    const likesCount = await prisma.snippetLike.count({
      where: {
        snippetId: snippetId,
      },
    });

    console.log("Résultat:", { isLiked, likesCount });

    res.json({
      isLiked,
      likesCount,
    });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    res.status(500).json({
      error: "Erreur lors du like",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
