import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import { findUserByUserId } from "../models/authModel.js";
import { loginWithGoogle, loginWithUsernmaneAndPassword } from "../controllers/authController.js";

dotenv.config();

const configurePassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // id ile serialize
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findUserByUserId(id); // id ile bul
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      loginWithUsernmaneAndPassword
    )
  );

  passport.use(
    "google",
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    }, loginWithGoogle)
  );
};

export default configurePassport;
