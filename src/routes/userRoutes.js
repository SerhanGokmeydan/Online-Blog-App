import express from "express";
import {
  editProfile,
  editProfilePage,
  followersPage,
  followingsPage,
  followProfile,
  profilePage,
  searchUser,
  uploadProfilPic,
} from "../controllers/userController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";
// import { getUser } from "../middlewares/userMiddleware";

const router = express.Router();

//get profile page
router.get("/profile/:id", profilePage);

//get edit user profile page
router.get("/edit-profile", editProfilePage);

//edit user profile
router.post("/edit-profile", editProfile);

//upload profil pic
router.post(
  "/upload-profile-pic",
  upload.single("profilePic"),
  uploadProfilPic
);

//search user
router.post("/search-user", searchUser);

//follow a profile
router.post("/follow", followProfile);

//followers page
router.get("/followers", followersPage);

//followering page
router.get("/followings", followingsPage);

export default router;
