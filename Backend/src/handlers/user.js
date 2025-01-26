import prisma from "../prisma/index.js";
import { hashPassword, createJWT, comparePasswords } from "../modules/auth.js";

// Inscription, création d'un user
export const createNewUser = async (req, res) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    //Création du user dans la db
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Connexion d'un user
export const signin = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    // Vérifier le mdp
    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Crér un JWT
    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
