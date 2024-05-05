const createAccount = `
    INSERT INTO users(email,password)
    values (?,?)
    `;

const fetchUser = `select * from users where email = ?  limit 1`;

module.exports = {
  createAccount,
  fetchUser,
};
