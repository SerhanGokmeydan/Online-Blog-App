import db from "../config/db.js";

//this func gets all the users from database
export const getAllUsersFromDb = async () => {
  try {
    const result = await db.query("select * from users");
    const users = result.rows;
    return users;
  } catch (err) {
    console.log("user model / get all users from database:", err);
  }
};

//this func finds the users in database by theirs username
export const findUserInDbByUsername = async (username) => {
  try {
    const result = await db.query(
      "select * from users where username like $1",
      [username]
    );
    const user = result.rows[0];
    return user;
  } catch (err) {
    console.log("user model / find user via username:" + err);
  }
};

//this func finds the users ind database by theirs user id
export const findUserInDbByUserId = async (userId) => {
  try {
    const result = await db.query("select * from users where id = $1", [
      userId,
    ]);
    const user = result.rows[0];
    return user;
  } catch (err) {
    console.log("user model / find user via user id:" + err);
  }
};

//this func edits a profile that is in database
export const editUserInDb = async (userId, username) => {
  try {
    await db.query("update users set username = $1 where id = $2", [
      username,
      userId,
    ]);
  } catch (err) {
    console.log("user model / edit user in database:", err);
  }
};

//this func uploads profile pic's path to database
export const uploadProfilPicToDb = async (picPath, userId) => {
  try {
    await db.query("update users set profile_pic_path = $1 where id = $2", [
      picPath,
      userId,
    ]);
  } catch (err) {
    console.log("user model / upload profile picture to database:", err);
  }
};

//this func searchsfirst 10 users via username in database
export const searchUsersInDb = async (username) => {
  try {
    const result = await db.query(
      "select * from users where username like '%' || $1 || '%' limit 10",
      [username]
    );
    const users = result.rows;
    return users;
  } catch (err) {
    console.log("user model / search users in database:", err);
  }
};

//this func adds a user that you follow to database
export const addFollowedUserToDb = async (userId, followedId) => {
  try {
    const result = await db.query(
      "insert into user_followed (user_id, followed_id) values ($1, $2)",
      [userId, followedId]
    );
    return result.rows[0];
  } catch (err) {
    console.log("user model / add followed user to database:", err);
  }
};

//this func gets all followers from database by user
export const getFollowersByUserFromDb = async (userId) => {
  try {
    const result = await db.query(
      "select users.* from user_followed join users on users.id = user_followed.user_id where user_followed.followed_id = $1",
      [userId]
    );
    const followers = result.rows;
    return followers;
  } catch (err) {
    console.log("user model / get followers by user from database:", err);
  }
};

//this func gets all followed from database by user
export const getFollowedByUserFromDb = async (userId) => {
  try {
    const result = await db.query(
      "select users.* from user_followed join users on users.id = user_followed.followed_id where user_followed.user_id = $1",
      [userId]
    );
    const followed = result.rows;
    return followed;
  } catch (err) {
    console.log("user model / get followed by user from database:", err);
  }
};

//this func finds followed in database
export const findFollowedInDb = async (userId, followedId) => {
  try {
    const result = await db.query(
      "select * from user_followed where user_id = $1 and followed_id = $2",
      [userId, followedId]
    );
    return result.rows[0];
  } catch (err) {
    console.log("user model / search followed in database:", err);
  }
};

//this func remove a follower from databse
export const deleteFollowedFromDb = async (userId, followedId) => {
  try {
    await db.query(
      "delete from user_followed where user_id = $1 and followed_id = $2",
      [userId, followedId]
    );
  } catch (err) {
    console.log("user model / delete followed from database", err);
  }
};
