import express from "express";
import {
  renderLoginPage,
  renderRegistrationPage,
  registerWithUsernameAndPassword,
  logout,
} from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

//registration routes
router.get("/register", renderRegistrationPage);
router.post("/register", registerWithUsernameAndPassword);

//login routes
router.get("/login", renderLoginPage);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

router.get("/auth/google", passport.authenticate("google",{
  scope:["profile"]
}))

router.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/login"
  })
);


//logout routes
router.get("/logout", logout);

export default router;
