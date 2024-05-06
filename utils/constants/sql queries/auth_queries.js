const createAccount = `
    INSERT INTO users(email,password)
    values (?,?)
    `;

const fetchUser = `
select * from users where email = ?  limit 1;
`;

const signUserIn="update  users set signed_in = 1 where email = ?"

const logout = `update  users set signed_in = 0 where id = ?`;

module.exports = {
  createAccount,
  fetchUser,
  logout,
  signUserIn,
};
