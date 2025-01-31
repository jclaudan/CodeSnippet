import prisma from "../prisma/index.js";

export const getSnippets = async (userId) => {
  return await prisma.snippet.findMany({
    where: {
      userId: userId,
    },
  });
};

export const addSnippet = async (snippetData, userId) => {
  return prisma.snippet.create({
    data: {
      title: snippetData.title,
      description: snippetData.description,
      category: snippetData.category,
      isPublic: snippetData.isPublic || false,
      likes: 0,
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      userId: true,
      isPublic: true,
      likes: true,
      createdAt: true,
      updatedAt: true,
    },
  });
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
      likes: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const removeSnippet = async (snippetId, userId) => {
  try {
    // Supprimer d'abord tous les likes associés
    await prisma.snippetLike.deleteMany({
      where: {
        snippetId: snippetId,
      },
    });

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
