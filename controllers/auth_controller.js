const queries = require("../utils/constants/sql queries/auth_queries");
const database = require("../utils/resources/database");

async function createAccount(params) {
  try {
    const query = queries.createAccount;
    const response = await database.query(query, [
      params.email,
      params.password,
    ]);

    const idData = await database.query(
      `SELECT id FROM users where email=? and password=? limit  1`,
      [params.email, params.password]
    );
    const id = idData[0][0].id;

    return {
      userId: id,
      response: response,
    };
  } catch (error) {
    throw error;
  }
}

async function login(params) {
  try {
    const query = queries.fetchUser;
    const response = await database.query(query, [
      params.email,
      params.password,
    ]);
    return response[0][0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createAccount,
  login,
};
