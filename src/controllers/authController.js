import {
  registerUser,
  findUserByUsername,
  googleLogin,
} from "../models/authModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRaunds = parseInt(process.env.SALTROUNDS);

//registration processes
export const getRegisterScreen = (req, res) => {
  res.render("register.ejs");
};

export const registerWithUsernameAndPassword = async (req, res) => {
  try {
    const username = req.body.username.trim().toLowerCase();
    const password = req.body.password.trim();
    const date = new Date().toISOString();

    const hashedPassword = await bcrypt.hash(password, saltRaunds);
    await registerUser(username, hashedPassword, date);

    // Kullanıcıyı tekrar bul ve id ile birlikte req.login'e ver
    const user = await findUserByUsername(username);
    req.login(user, (err) => {
      if (err) {
        console.log("authController:" + err);
        return res.redirect("/login");
      }
      return res.redirect("/posts");
    });
  } catch (err) {
    console.log("authController:" + err);
    res.redirect("/register");
  }
};

//get login page
export const getLoginPage = (req, res) => {
  res.render("login.ejs");
};

//login with username and password
export const loginWithUsernmaneAndPassword = async (
  username,
  password,
  done
) => {
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
};

//login with google
export const loginWithGoogle = async (
  accssesToken,
  refreshToken,
  profil,
  done
) => {
  try {
    const username = profil.displayName.trim().toLowerCase();

    const user = await findUserByUsername(username);
    if (!user) {
      const date = new Date().toISOString();
      const newUser = await googleLogin(username, date);
      return done(null, newUser);
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
};

//logout processes
export const logoutFunction = (req, res) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
};
