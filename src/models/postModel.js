import db from "../config/db.js";

//fetch all posts from fb
export const fetchAllPosts = async () => {
  const result = await db.query("select * from posts");
  const posts = result.rows;
  return posts;
};

//fetch a post by its id
export const fetchPostById = async (postId) => {
  const result = await db.query("select * from posts where id = $1",[postId]);
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
  await db.query(
    "update posts set title = $1, content = $2 where id = $3",
    [updatedPost.title, updatedPost.content, updatedPost.id]
  );
};
