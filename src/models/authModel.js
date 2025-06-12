import db from "../config/db.js";

//this func saves user registration to database
export const saveUserRegistrationToDb = async (username, password) => {
  try {
    await db.query("insert into users (username, password) values ($1, $2)", [
      username,
      password,
    ]);
  } catch (err) {
    console.log("auth model / save user registration to database:" + err);
  }
};

//this func saves user login that is via google to database
export const saveGoogleLoginToDb = async (username) => {
  try {
    const result = await db.query(
      "insert into users (username, password) values ($1, $2) returning *",
      [username, "google"]
    );
    const user = result.rows[0];
    return user;
  } catch (err) {
    console.log("auth model / save google login to database:", err);
  }
};
