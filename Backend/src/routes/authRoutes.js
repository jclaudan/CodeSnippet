import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// Fonction helper pour gérer la redirection
const handleAuthCallback = (req, res) => {
  try {
    if (!req.user) {
      console.error("No user found in request");
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user`);
    }

    if (!req.user.token) {
      console.error("No token found in user object");
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_token`);
    }

    // Log pour déboguer
    console.log("Redirecting with token:", req.user.token);

    // Redirection avec le token
    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/success?token=${req.user.token}`
    );
  } catch (error) {
    console.error("Auth Callback Error:", error);
    return res.redirect(
      `${process.env.FRONTEND_URL}/login?error=callback_failed`
    );
  }
};

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
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`,
  }),
  handleAuthCallback
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
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=github_auth_failed`,
  }),
  handleAuthCallback
);

export default router;
