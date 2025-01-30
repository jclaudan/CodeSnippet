import prisma from "../prisma/index.js";

export const getSnippets = async (userId) => {
  return await prisma.snippet.findMany({
    where: { userId: userId }, // Filtrer par userId
  });
};

export const addSnippet = async (snippetData, userId) => {
  return prisma.snippet.create({
    data: {
      title: snippetData.title,
      description: snippetData.description,
      category: snippetData.category,
      userId: userId,
    },
  });
};

export const modifySnippet = async (id, data) => {
  return await prisma.snippet.update({
    where: { id: id },
    data,
  });
};

export const removeSnippet = async (id) => {
  return await prisma.snippet.delete({
    where: { id: id },
  });
};
