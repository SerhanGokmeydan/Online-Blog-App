import db from "../config/db.js";

//fetch all users
export const fetchAllUsers = async () => {
  try {
    const result = await db.query("select * from users");
    const users = result.rows;
    return users;
  } catch (err) {
    console.log("user model", err);
  }
};

//fetch user info
export const fetchUserInfoById = async (userId) => {
  try {
    const result = await db.query("select * from users where id = $1", [
      userId,
    ]);
    const user = result.rows[0];
    return user;
  } catch (err) {
    console.log("user model", err);
  }
};

//fetch posts by user
export const fetchPostsByUser = async (userId) => {
  try {
    const result = await db.query(
      "select * from users inner join posts on users.id = posts.user_id where users.id = $1",
      [userId]
    );
    const posts = result.rows;
    return posts;
  } catch (err) {
    console.log("user model:", err);
  }
};

export const editProfileFromDb = async (userId, username) => {
  try {
    await db.query("update users set username = $1 where id = $2", [
      username,
      userId,
    ]);
  } catch (err) {
    console.log("post model", err);
  }
};

//upload profil pic
export const uploadProfilPicToDb = async (imgPath, userId) => {
  try {
    await db.query("update users set profile_img = $1 where id = $2", [
      imgPath,
      userId,
    ]);
  } catch (err) {
    console.log("user model", err);
  }
};


//search user from db
export const searchUserFromDb = async (username) => {
  try{
    const result = await db.query("select * from users where username like $1 limit 10", [`%${username}%`])
    const users = result.rows;
    return users
  }catch(err){
    console.log("user model", err)
  }
}

//
//
//follow a profile
export const addFollowingUserToDb = async (userId, profileId) => {
  try {
    const result = await db.query(
      "insert into user_followers (user_id, follower_id) values ($1, $2)",
      [userId, profileId]
    );
    return result.rows[0];
  } catch (err) {
    console.log("user model", err);
  }
};

//get followers page
export const getFollowersByUser = async (userId) => {
  try {
    const result = await db.query(
      "select users.* from user_followers join users on users.id = user_followers.user_id where user_followers.follower_id = $1",
      [userId]
    );
    const followers = result.rows;
    return followers;
  } catch (err) {
    console.log("user model", err);
  }
};

//get followings page
export const getFollowingsByUser = async (userId) => {
  try {
    const result = await db.query(
      "select users.* from user_followers join users on users.id = user_followers.follower_id where user_followers.user_id = $1",
      [userId]
    );
    const followers = result.rows;
    return followers;
  } catch (err) {
    console.log("user model", err);
  }
};

//search profile in followers
export const searchUserInFollowers = async (userId, profileId) => {
  try {
    const result = await db.query(
      "select * from user_followers where user_id = $1 and follower_id = $2",
      [userId, profileId]
    );
    return result.rows[0];
  } catch (err) {
    console.log("user model", err);
  }
};

// unfollow a profile
export const unfollowUserFromFollowers = async (userId, profileId) => {
  try {
    await db.query(
      "delete from user_followers where user_id = $1 and follower_id = $2",
      [userId, profileId]
    );
  } catch (err) {
    console.log("user model", err);
  }
};