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
        let user = await prisma.user.findFirst({
          where: {
            provider: "google",
            providerId: profile.id,
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              username: profile.displayName,
              email: profile.emails[0].value,
              provider: "google",
              providerId: profile.id,
            },
          });
        }

        const token = createJWT(user);
        user.token = token;
        done(null, user);
      } catch (err) {
        done(err, null);
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
        console.log("Attempting GitHub authentication for:", profile.username);

        // D'abord chercher par providerId
        let user = await prisma.user.findUnique({
          where: {
            providerId: profile.id.toString(),
          },
        });

        if (!user) {
          console.log("Creating new user for:", profile.username);

          // Générer un username unique
          const baseUsername =
            profile.username || profile.displayName || "user";
          const uniqueUsername = `${baseUsername}_${Date.now()}`;

          user = await prisma.user.create({
            data: {
              username: uniqueUsername,
              email: profile.emails?.[0]?.value || null,
              provider: "github",
              providerId: profile.id.toString(),
              password: null, // Les utilisateurs OAuth n'ont pas de mot de passe
            },
          });

          console.log("New user created:", user.id);
        } else {
          console.log("Existing user found:", user.id);
        }

        // Générer le token JWT
        const token = createJWT(user);
        user.token = token;

        console.log("Authentication successful, redirecting...");
        return done(null, user);
      } catch (err) {
        console.error("GitHub Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);

export default passport;
