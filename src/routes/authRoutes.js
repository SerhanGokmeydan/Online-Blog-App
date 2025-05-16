import express from "express";
import {
  getLoginPage,
  getRegisterScreen,
  registerWithUsernameAndPassword,
  logoutFunction,
} from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

//registration routes
router.get("/register", getRegisterScreen);
router.post("/register", registerWithUsernameAndPassword);

//login routes
router.get("/login", getLoginPage);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login",
  })
);

router.get("/auth/google", passport.authenticate("google",{
  scope:["profile"]
}))

router.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/posts",
    failureRedirect: "/login"
  })
);


//logout routes
router.get("/logout", logoutFunction);

export default router;
