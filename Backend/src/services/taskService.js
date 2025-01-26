import prisma from "../prisma/index.js";

export const getTasks = async () => {
  return await prisma.task.findMany();
};

export const addTask = async (taskData, userId) => {
  return prisma.task.create({
    data: {
      title: taskData.title,
      description: taskData.description,
      userId: userId,
    },
  });
};

export const modifyTask = async (id, data) => {
  return await prisma.task.update({
    where: { id: Number(id) },
    data,
  });
};

export const removeTask = async (id) => {
  return await prisma.task.delete({
    where: { id: Number(id) },
  });
};
