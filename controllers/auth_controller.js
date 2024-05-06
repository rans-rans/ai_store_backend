const queries = require("../utils/constants/sql queries/auth_queries");
const database = require("../utils/resources/database");

async function createAccount(params) {
  try {
    const createQuery = queries.createAccount;

    //trying to insert user into table
    //if user already exist, exception is throw
    await database.query(createQuery, [params.email, params.password]).catch((err)=>{
      print(err)
      throw err;
    });

    //if the insert was successful, we retrieve the credentials of that user
    const userData = await database.query(
      `SELECT * FROM users where email=? and password=? limit  1`,
      [params.email, params.password]
    );
    const user = userData[0][0];

    return { user: user };
  } catch (error) {
    throw error;
  }
}

async function login(email) {
  try {
    await signUserIn(email);
    const fetchQuery = queries.fetchUser;
    const response = await database.query(fetchQuery, [email]);
    return response[0][0];
  } catch (error) {
    throw error;
  }
}

async function signUserIn(email) {
  await database.query(queries.signUserIn, [email]);
}

async function logout(id) {
  try {
    const query = queries.logout;
    const response = await database.query(query, [id]);
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createAccount,
  login,
  logout,
};
