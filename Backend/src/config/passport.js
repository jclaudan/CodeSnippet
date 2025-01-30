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
        console.log("GitHub Profile:", profile);

        let user = await prisma.user.findFirst({
          where: {
            email: profile.emails?.[0]?.value,
          },
        });

        if (!user) {
          console.log("Creating new user for GitHub");
          user = await prisma.user.create({
            data: {
              username: `${profile.username}_${Date.now()}`,
              email: profile.emails?.[0]?.value,
              provider: "github",
              providerId: profile.id.toString(),
            },
          });
        }

        const token = createJWT(user);
        user.token = token;
        console.log("Authentication successful, returning user");
        done(null, user);
      } catch (err) {
        console.error("GitHub Strategy Error:", err);
        done(err, null);
      }
    }
  )
);

export default passport;
