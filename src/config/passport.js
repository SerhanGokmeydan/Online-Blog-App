import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { findUserByUsername } from "../models/authModel.js";

dotenv.config();

const configurePassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser(async (username, done) => {
    try {
      const user = await findUserByUsername(username);
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
      async (username, password, done) => {
        try {
          const user = await findUserByUsername(username.trim().toLowerCase());
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const valid = await bcrypt.compare(password, user.password);
          if (!valid) {
            return done(null, false, { message: "Password is not correct" });
          }

          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};

export default configurePassport;
