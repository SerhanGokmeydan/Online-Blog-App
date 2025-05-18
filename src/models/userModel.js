import db from "../config/db.js";

//fetch all users
// export const fetchAllUsers = async () => {
//   try{
//     const result = await db.query("select * from users")
//     const users = result.rows;
//     return users;
//   } catch(err){
//     console.log("user model", err)
//   }
// }

//fetch user info
export const fetchUserInfoById = async (userId) => {
  try{
    const result = await db.query("select * from users where id = $1", [userId]);
    const user = result.rows[0];
    return user;

  }catch(err){
    console.log("user model", err)
  }
};

//fetch posts by user
export const fetchPostsByUser = async (userId) => {
  try{
    const result = await db.query(
      "select * from users inner join posts on users.id = posts.user_id where users.id = $1", [userId]
    );
    const posts = result.rows;
    return posts;
  }catch(err){
    console.log("user model:", err)
  }
};
