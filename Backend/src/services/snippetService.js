import prisma from "../prisma/index.js";

export const getSnippets = async (userId) => {
  return await prisma.snippet.findMany({
    where: {
      userId: userId,
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
  });
};

export const getPublicSnippets = async (userId) => {
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

  return snippets.map((snippet) => ({
    ...snippet,
    isLiked: snippet.likes.some((like) => like.userId === userId),
    isBookmarked: snippet.bookmarks.some(
      (bookmark) => bookmark.userId === userId
    ),
    likesCount: snippet.likes.length,
  }));
};

export const addSnippet = async (snippetData, userId) => {
  return prisma.snippet.create({
    data: {
      ...snippetData,
      userId,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
};

export const deleteSnippet = async (snippetId, userId) => {
  const snippet = await prisma.snippet.findUnique({
    where: { id: snippetId },
  });

  if (!snippet) {
    throw new Error("Snippet non trouvé");
  }

  if (snippet.userId !== userId) {
    throw new Error("Non autorisé");
  }

  return prisma.$transaction([
    prisma.snippetLike.deleteMany({ where: { snippetId } }),
    prisma.snippetBookmark.deleteMany({ where: { snippetId } }),
    prisma.snippet.delete({ where: { id: snippetId } }),
  ]);
};

export const modifySnippet = async (id, data) => {
  return await prisma.snippet.update({
    where: { id: id },
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      isPublic: data.isPublic,
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      userId: true,
      isPublic: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const removeSnippet = async (snippetId, userId) => {
  try {
    // Ensuite supprimer le snippet
    return await prisma.snippet.delete({
      where: {
        id: snippetId,
        userId: userId,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    throw error;
  }
};
