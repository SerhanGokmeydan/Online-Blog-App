// config db passport ayarları için
// controllers auth post ve user işlemleri için
//middlewares middleware fonksiyonlar için
//models veri tabanıyla iletişime geçen fonksiyonlar için
//routes http istekleri için

import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./src/routes/authRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import configurePassport from "./src/config/passport.js";
import { ensureAuthenticated } from "./src/middlewares/authMiddleware.js";

dotenv.config();
const app = express();

configurePassport(passport); // sadece bir kez çağrılır

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//to use user id in all files
app.use((req, res, next) => {
  res.locals.userId = req.user ? req.user.id : null;
  next();
});

app.use("/", authRoutes);
app.use("/", ensureAuthenticated, postRoutes);
app.use("/", ensureAuthenticated, userRoutes);

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
