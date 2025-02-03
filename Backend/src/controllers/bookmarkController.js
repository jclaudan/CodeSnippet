import prisma from "../prisma/index.js";

export const toggleBookmark = async (req, res) => {
  try {
    const { snippetId } = req.params;
    const userId = req.user.userId;

    const existingBookmark = await prisma.snippetBookmark.findUnique({
      where: {
        userId_snippetId: {
          userId: userId,
          snippetId: snippetId,
        },
      },
    });

    if (existingBookmark) {
      await prisma.snippetBookmark.delete({
        where: {
          userId_snippetId: {
            userId: userId,
            snippetId: snippetId,
          },
        },
      });
    } else {
      await prisma.snippetBookmark.create({
        data: {
          userId: userId,
          snippetId: snippetId,
        },
      });
    }

    res.json({
      isBookmarked: !existingBookmark,
    });
  } catch (error) {
    console.error("Erreur lors du bookmark:", error);
    res.status(500).json({ error: "Erreur lors du bookmark" });
  }
};

export const getBookmarkedSnippets = async (req, res) => {
  try {
    const userId = req.user.userId;

    const bookmarkedSnippets = await prisma.snippet.findMany({
      where: {
        bookmarks: {
          some: {
            userId: userId,
          },
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
        likes: true,
        bookmarks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Formater les snippets avec les informations de like et bookmark
    const formattedSnippets = bookmarkedSnippets.map((snippet) => ({
      ...snippet,
      isLiked: snippet.likes.some((like) => like.userId === userId),
      isBookmarked: true, // Puisque ce sont tous des snippets bookmarkés
      likesCount: snippet.likes.length,
    }));

    res.json(formattedSnippets);
  } catch (error) {
    console.error("Erreur lors de la récupération des bookmarks:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des bookmarks" });
  }
};
