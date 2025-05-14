// config db passport ayarları için
// controllers auth post ve user işlemleri için
//middlewares middleware fonksiyonlar için
//models veri tabanıyla iletişime geçen fonksiyonlar için
//routes http istekleri için

import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./src/routes/authRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import configurePassport from "./src/config/passport.js";

dotenv.config();
const app = express();

configurePassport(passport); // <-- önce çağırın

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

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", authRoutes);
app.use("/", postRoutes);

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
