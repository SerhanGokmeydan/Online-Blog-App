import express from "express";
import {
  editProfile,
  renderEditProfilePage,
  renderFollowersPage,
  renderFollowedPage,
  followUser,
  renderUserProfilePage,
  searchUsers,
  uploadProfilPic,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

//get route to render user profile page
router.get("/profile/:id", renderUserProfilePage);

//get route to render edit user profile page
router.get("/edit-profile", renderEditProfilePage);

//post route to edit user profile
router.post("/edit-profile", editProfile);

//post route to upload profil pic
router.post(
  "/upload-profile-pic",
  upload.single("profilePic"),
  uploadProfilPic
);

//post route to search user
router.post("/search-user", searchUsers);

//post route to follow a profile
router.post("/follow", followUser);

//get route to render followers page
router.get("/followers/:id", renderFollowersPage);

//get route to render followed page
router.get("/followed/:id", renderFollowedPage);

export default router;
