import db from "../config/db.js";

//fetch all posts from fb
export const fetchAllPosts = async () => {
  const result = await db.query("select * from posts");
  const posts = result.rows;
  return posts;
};

//fetch a post by its id
export const fetchPostById = async (postId) => {
  const result = await db.query("select * from posts where id = $1", [postId]);
  const post = result.rows[0];
  return post;
};

//push a post to db
export const pushPostToDb = async (newPost) => {
  try {
    await db.query(
      "insert into posts (user_id, title, content, author, date, likes) values ($1, $2, $3, $4, $5, $6)",
      [
        newPost.userId,
        newPost.title,
        newPost.content,
        newPost.author,
        newPost.date,
        newPost.likes,
      ]
    );
  } catch (err) {
    console.log("postModel", err);
  }
};

//edit a post from db
export const editPostFromDb = async (updatedPost) => {
  await db.query("update posts set title = $1, content = $2 where id = $3", [
    updatedPost.title,
    updatedPost.content,
    updatedPost.id,
  ]);
};

//delete a post from db
export const deletePostFromDb = async (postId) => {
  try {
    await db.query("delete from posts where id = $1", [postId]);
  } catch (err) {
    console.log("post model", err);
  }
};

//search posts from db
export const searchPostFromDb = async (title) => {
  try {
    const result = await db.query(
      "select * from posts where title like $1 limit 10",
      [`%${title}%`]
    );
    const posts = result.rows;
    return posts;
  } catch (err) {
    console.log("post model", err);
  }
};

//add favorite post to db
export const addFavoritePostToDb = async (userId, postId) => {
  try {
    const result = await db.query(
      "insert into user_favorites (user_id, post_id) values ($1, $2)",
      [userId, postId]
    );
    return result.rows[0];
  } catch (err) {
    console.log("post model", err);
  }
};

//get favorite posts by user
export const getFavoritePostsByUser = async (userId) => {
  try {
    const result = await db.query(
      "select posts.* from user_favorites join posts on posts.id = user_favorites.post_id where user_favorites.user_id = $1",
      [userId]
    );
    const favorites = result.rows;
    return favorites;
  } catch (err) {
    console.log("post model", err);
  }
};

//search post in favorites
export const searchPostInFavorites = async (userId, postId) => {
  try {
    const result = await db.query(
      "select * from user_favorites where user_id = $1 and post_id = $2",
      [userId, postId]
    );
    return result.rows[0];
  } catch (err) {
    console.log("post model", err);
  }
};

// remove post from favorites
export const removePostFromFavorites = async (userId, postId) => {
  try {
    await db.query(
      "delete from user_favorites where user_id = $1 and post_id = $2",
      [userId, postId]
    );
  } catch (err) {
    console.log("post model", err);
  }
};
