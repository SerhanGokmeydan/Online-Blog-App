import { registerUser } from "../models/authModel.js";
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
    const username = req.body.username.trim().toLowerCase();;
    const password = req.body.password.trim();
    const date = new Date().toDateString();

    const hashedPassword = await bcrypt.hash(password, saltRaunds);
    await registerUser(username, hashedPassword, date);

    // Kullanıcıyı otomatik olarak login yap
    req.login({ username: username }, (err) => {
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

//login processes
export const getLoginPage = (req, res) => {
  res.render("login.ejs");
};

//logout processes
export const logoutFunction = (req, res) => {
  req.logout((err) => {
    if(err){
      next(err)
    }
    res.redirect("/")
  })
}
