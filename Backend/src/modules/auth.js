import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt); // Hashage du mdp avec le sel
};

export const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const createJWT = (user) => {
  const payload = { userId: user.id, username: user.username };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};
