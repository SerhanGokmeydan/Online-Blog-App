import {
  findUserInDbByUserId,
  editUserInDb,
  getAllUsersFromDb,
  uploadProfilPicToDb,
  searchUsersInDb,
  findFollowedInDb,
  deleteFollowedFromDb,
  addFollowedUserToDb,
  getFollowersByUserFromDb,
  getFollowedByUserFromDb,
} from "../models/userModel.js";

import { getPostsFromDbByUserId } from "../models/postModel.js";

//this func renders user profile page
export const renderUserProfilePage = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await findUserInDbByUserId(userId);
    const posts = await getPostsFromDbByUserId(userId);
    const isFollowed = await findFollowedInDb(req.user.id, userId);
    const followerCount = await getFollowersByUserFromDb(userId);
    const followedCount = await getFollowedByUserFromDb(userId);

    res.render("profile.ejs", {
      user,
      posts,
      isFollowed,
      followerCount,
      followedCount,
    });
  } catch (err) {
    console.log("user controller / render user profile page", err);
  }
};

//this func renders edit profile page
export const renderEditProfilePage = (req, res) => {
  try {
    const username = req.user.username;
    const picPath = req.user.profile_pic_path;
    
    res.render("editProfile.ejs", {
      username,
      picPath,
    });
  } catch (err) {
    console.log("user controller / render edit profile page:", err);
  }
};

//this func edits the profile
export const editProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.body.username;

    const users = await getAllUsersFromDb();
    const user = users.find((user) => {
      user.username == username;
    });

    if (user) {
      await editUserInDb(userId, username);
    }

    res.redirect("/profile/" + userId);
  } catch (err) {
    console.log("user controller / edit profile:", err);
  }
};

//this func uploads picture
export const uploadProfilPic = async (req, res) => {
  try {
    const userId = req.user.id;
    const picPath = `/uploads/${req.file.filename}`;

    await uploadProfilPicToDb(picPath, userId);

    res.redirect("/profile/" + userId);
  } catch (err) {
    console.log("user controller / upload profile picture:", err);
  }
};

//this func searches another profile
export const searchUsers = async (req, res) => {
  try {
    const username = req.body.username;
    const users = await searchUsersInDb(username);
    res.status(200).json({ users });
  } catch (err) {
    console.log("user controller / search users:", err);
  }
};

//this func followes another user
export const followUser = async (req, res) => {
  try {
    const followedId = req.body.followedId;
    const userId = req.user.id;
    const isFollowed = await findFollowedInDb(userId, followedId);

    if (isFollowed) {
      await deleteFollowedFromDb(userId, followedId);
      res.status(200);
    } else {
      await addFollowedUserToDb(userId, followedId);
      res.status(200);
    }
  } catch (err) {
    console.log("user controller / follow user:", err);
  }
};

//this func renders followers page
export const renderFollowersPage = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const followers = await getFollowersByUserFromDb(userId);

    res.render("followers-followed.ejs", { followers_followed : followers });
  } catch (err) {
    console.log("user controller / render followers page", err);
  }
};

//this func renders followed page
export const renderFollowedPage = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const followed = await getFollowedByUserFromDb(userId);

    res.render("followers-followed.ejs", { followers_followed: followed });
  } catch (err) {
    console.log("user controller / render followed page", err);
  }
};
