import {
  fetchPostsByUser,
  fetchUserInfoById,
  editProfileFromDb,
  fetchAllUsers,
  uploadProfilPicToDb,
  searchUserFromDb,
  searchUserInFollowers,
  unfollowUserFromFollowers,
  addFollowingUserToDb,
  getFollowersByUser,
  getFollowingsByUser
} from "../models/userModel.js";

//get profile page
export const profilePage = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await fetchUserInfoById(id);
    const posts = await fetchPostsByUser(id);

    res.render("profile.ejs", {
      user: { ...user, posts: posts },
    });
  } catch (err) {
    console.log("user controller", err);
  }
};

//edit profile page
export const editProfilePage = (req, res) => {
  const username = req.user.username;
  const profilePic = req.user.profile_img;

  res.render("editProfile.ejs", {
    username: username,
    profilePic: profilePic,
  });
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.body.username;

    const users = await fetchAllUsers();
    const user = users.find((user) => {
      user.username == username;
    });

    if (user) {
      await editProfileFromDb(userId, username);
    }

    res.redirect("/profile/" + userId);
  } catch (err) {
    console.log("user controller", err);
  }
};

//upload profil picture
export const uploadProfilPic = async (req, res) => {
  try {
    const userId = req.user.id;
    const imgPath = `/uploads/${req.file.filename}`;

    await uploadProfilPicToDb(imgPath, userId);

    res.redirect("/profile/" + userId)
  } catch (err) {
    console.log("user controller", err);
  }
};

//search user
export const searchUser = async (req, res) => {
  try{
    const {data} = req.body;
    const users = await searchUserFromDb(data)
    res.status(200).json({users})
  }catch(err){
    console.log(err)
  }
}

//
//
//add a post to favorites
export const followProfile = async (req, res) => {
  try{
    const {profileId} = req.body;
    const userId = req.user.id;
    const isFollowing = await searchUserInFollowers(userId, profileId)
    
    if(isFollowing){
      await unfollowUserFromFollowers(userId, profileId)
      res.status(200).json({info: "user was unfollowed"})
    }else{
      await addFollowingUserToDb(userId, profileId)
      res.status(200).json({info: "user was followed"})
    }

  }catch(err){
    console.log("user controller", err)
  }
}

//favorites page
export const followersPage = async (req, res) => {
  try {
    const userId = req.user.id;
    const followers = await getFollowersByUser(userId);

    res.render("followers.ejs", { followers });

  } catch (err) {
    console.log("user controller", err);
  }
};

//favorites page
export const followingsPage = async (req, res) => {
  try {
    const userId = req.user.id;
    const followings= await getFollowingsByUser(userId);

    res.render("followings.ejs", { followings });

  } catch (err) {
    console.log("user controller", err);
  }
};