import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import prisma from "../prisma/index.js";
import { createJWT } from "../modules/auth.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

const handleOAuthUser = async (profile, provider) => {
  try {
    console.log(`Tentative d'authentification ${provider} pour:`, profile.id);

    // 1. Chercher l'utilisateur
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { providerId: profile.id.toString() },
          { email: profile.emails?.[0]?.value },
        ],
      },
    });

    if (!user) {
      // 2. Créer un nouvel utilisateur
      const username =
        profile.displayName || profile.username || `user_${Date.now()}`;
      user = await prisma.user.create({
        data: {
          username: username,
          email: profile.emails?.[0]?.value,
          provider: provider,
          providerId: profile.id.toString(),
          password: null,
        },
      });
      console.log("Nouvel utilisateur créé:", user.id);
    }

    return user;
  } catch (error) {
    console.error("Erreur handleOAuthUser:", error);
    throw error;
  }
};

// Utiliser la même fonction pour Google et GitHub
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://codesnippet-cy4q.onrender.com/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await handleOAuthUser(profile, "google");
        const token = createJWT(user);
        user.token = token;
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://codesnippet-cy4q.onrender.com/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await handleOAuthUser(profile, "github");
        const token = createJWT(user);
        user.token = token;
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
