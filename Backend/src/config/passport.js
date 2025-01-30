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
    // 1. Chercher d'abord par email
    let user = await prisma.user.findFirst({
      where: {
        email: profile.emails?.[0]?.value,
      },
    });

    // 2. Si pas trouvé, chercher par providerId
    if (!user) {
      user = await prisma.user.findFirst({
        where: {
          providerId: profile.id.toString(),
          provider: provider,
        },
      });
    }

    // 3. Si l'utilisateur existe, mettre à jour ses infos OAuth
    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          provider: provider,
          providerId: profile.id.toString(),
        },
      });
    } else {
      // 4. Créer un nouvel utilisateur
      const username = `${
        profile.username || profile.displayName || "user"
      }_${Date.now()}`;
      user = await prisma.user.create({
        data: {
          username: username,
          email: profile.emails?.[0]?.value,
          provider: provider,
          providerId: profile.id.toString(),
          password: null,
        },
      });
    }

    return user;
  } catch (error) {
    console.error("OAuth user handling error:", error);
    throw error;
  }
};

// Configuration Google Strategy
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
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Configuration GitHub Strategy
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
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
