import db from "../config/db.js";

//registration db
export const registerUser = async (username, password, date) => {
  try {
    await db.query(
      "insert into users (username, password, date) values ($1, $2, $3)",
      [username, password, date]
    );
  } catch (err) {
    console.log("authModel:" + err);
  }
};

//passport db
export const findUserByUsername = async (username) => {
  try {
    const result = await db.query("select * from users where username = $1", [username]);
    const user = result.rows[0];
    return user;
  } catch (err) {
    console.log("authModel:" + err);
  }
};

export const findUserByUserId = async (userId) => {
  try {
    const result = await db.query("select * from users where id = $1", [userId]);
    const user = result.rows[0];
    return user;
  } catch (err) {
    console.log("authModel:" + err);
  }
};

export const googleLogin = async (username, date) => {
  try{
    const result = await db.query("insert into users (username, password, date) values ($1, $2, $3) returning *", [username, "google", date]);
    const user = result.rows[0]
    return user;
  }catch(err){
    console.log("authModel", err)
  }

}
