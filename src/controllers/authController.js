import {
  saveUserRegistrationToDb,
  saveGoogleLoginToDb,
} from "../models/authModel.js";
import { findUserInDbByUsername } from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRaunds = parseInt(process.env.SALTROUNDS);

//this func renders the registration page by sending info to login-register.ejs
export const renderRegistrationPage = (req, res) => {
  try {
    res.render("login-register.ejs", { info: "registration" });
  } catch (err) {
    console.log("auth controller / render registration page:", err);
  }
};

//this func registers with username and password
export const registerWithUsernameAndPassword = async (req, res) => {
  try {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    const hashedPassword = await bcrypt.hash(password, saltRaunds);
    await saveUserRegistrationToDb(username, hashedPassword);

    // find user again and pass it to req.login with its id
    const user = await findUserInDbByUsername(username);
    req.login(user, (err) => {
      if (err) {
        console.log(
          "auth controller / register with username and password / req.login:" +
            err
        );
        return res.redirect("/login");
      }
      return res.redirect("/home");
    });
  } catch (err) {
    console.log("auth controller / register with username and password:" + err);
    res.redirect("/register");
  }
};

//this func renders the login page by sending info to login-register.ejs
export const renderLoginPage = (req, res) => {
  try {
    res.render("login-register.ejs", { info: "login" });
  } catch (err) {
    console.log("auth controller / render login page", err);
  }
};

//this func logins with username and password
export const loginWithUsernmaneAndPassword = async (
  username,
  password,
  done
) => {
  try {
    const user = await findUserInDbByUsername(username.trim());
    const valid = await bcrypt.compare(password.trim(), user.password);

    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    if (!valid) {
      return done(null, false, { message: "Password is not correct" });
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
};

//this func logins with google
export const loginWithGoogle = async (
  accssesToken,
  refreshToken,
  profil,
  done
) => {
  try {
    const username = profil.displayName.trim();
    const user = await findUserInDbByUsername(username);

    if (!user) {
      const newUser = await saveGoogleLoginToDb(username);
      return done(null, newUser);
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
};

//this func logouts
export const logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        next(err);
      }
      res.redirect("/");
    });
  } catch (err) {
    console.log("auth controller / logout:", err);
  }
};
