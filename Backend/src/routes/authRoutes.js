import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// Routes Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {
      if (err) {
        console.error("Google Auth Error:", err);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=auth_failed`
        );
      }

      if (!user) {
        console.error("No user found:", info);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=user_not_found`
        );
      }

      try {
        if (!user.token) {
          throw new Error("Token not generated");
        }

        return res.redirect(
          `${process.env.FRONTEND_URL}/auth/success?token=${user.token}`
        );
      } catch (error) {
        console.error("Token Error:", error);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=token_error`
        );
      }
    })(req, res, next);
  }
);

// Routes GitHub
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    session: false,
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res, next) => {
    passport.authenticate("github", { session: false }, (err, user, info) => {
      if (err) {
        console.error("GitHub Auth Error:", err);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=auth_failed`
        );
      }

      if (!user) {
        console.error("No user found:", info);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=user_not_found`
        );
      }

      try {
        if (!user.token) {
          throw new Error("Token not generated");
        }

        return res.redirect(
          `${process.env.FRONTEND_URL}/auth/success?token=${user.token}`
        );
      } catch (error) {
        console.error("Token Error:", error);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=token_error`
        );
      }
    })(req, res, next);
  }
);

export default router;
