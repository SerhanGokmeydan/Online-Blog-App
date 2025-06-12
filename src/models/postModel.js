import db from "../config/db.js";

//this func gets all posts from database
export const getAllPostsFromDb = async () => {
  try {
    const result = await db.query("select * from posts");
    const posts = result.rows;
    return posts;
  } catch (err) {
    console.log("post model / get all posts from database:", err);
  }
};

//this func gets posts from database by user id
export const getPostsFromDbByUserId = async (userId) => {
  try {
    const result = await db.query(
      "select * from users inner join posts on users.id = posts.user_id where users.id = $1",
      [userId]
    );
    const posts = result.rows;
    return posts;
  } catch (err) {
    console.log("post model / get posts from database via user id:", err);
  }
};

//this func gets posts from database by post id
export const getPostFromDbByPostId = async (postId) => {
  try {
    const result = await db.query("select * from posts where id = $1", [
      postId,
    ]);
    const post = result.rows[0];
    return post;
  } catch (err) {
    console.log("post model / get posts from database via post id:", err);
  }
};

//this func adds a new post to database
export const addPostToDb = async (newPost) => {
  try {
    await db.query(
      "insert into posts (user_id, title, content, author) values ($1, $2, $3, $4)",
      [newPost.userId, newPost.title, newPost.content, newPost.author]
    );
  } catch (err) {
    console.log("post model / add post to database:", err);
  }
};

//this func edits a post in database
export const editPostInDb = async (editedPost) => {
  await db.query("update posts set title = $1, content = $2 where id = $3", [
    editedPost.title,
    editedPost.content,
    editedPost.id,
  ]);
};

//this func deletes a post from database
export const deletePostFromDb = async (postId) => {
  try {
    await db.query("delete from posts where id = $1", [postId]);
  } catch (err) {
    console.log("post model / delete post from database:", err);
  }
};

//this func searches first 10 posts from database by search value
export const searchPostsInDb = async (title) => {
  try {
    const result = await db.query(
      "select * from posts where title like '%' || $1 || '%' limit 10",
      [title]
    );
    const posts = result.rows;
    return posts;
  } catch (err) {
    console.log("post model / search posts in database:", err);
  }
};

//this func adds favorite post to database
export const addFavoritePostToDb = async (userId, postId) => {
  try {
    const result = await db.query(
      "insert into user_favorites (user_id, post_id) values ($1, $2)",
      [userId, postId]
    );
    return result.rows[0];
  } catch (err) {
    console.log("post model / add favorites post to database:", err);
  }
};

//this func gets favorites from database by user
export const getFavoritesFromDbByUser = async (userId) => {
  try {
    const result = await db.query(
      "select posts.* from user_favorites join posts on posts.id = user_favorites.post_id where user_favorites.user_id = $1",
      [userId]
    );
    const favorites = result.rows;
    return favorites;
  } catch (err) {
    console.log("post model / get favorites from database by user:", err);
  }
};

//this func finds favorite post in database
export const findFavoriteInDb = async (userId, postId) => {
  try {
    const result = await db.query(
      "select * from user_favorites where user_id = $1 and post_id = $2",
      [userId, postId]
    );
    return result.rows[0];
  } catch (err) {
    console.log("post model / find favorite in database:", err);
  }
};

// this func deletes favorite from database
export const deleteFavoriteFromDb = async (userId, postId) => {
  try {
    await db.query(
      "delete from user_favorites where user_id = $1 and post_id = $2",
      [userId, postId]
    );
  } catch (err) {
    console.log("post model / delete favorite from database:", err);
  }
};
