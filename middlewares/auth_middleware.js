const jwt = require("jsonwebtoken");

const database = require("../utils/resources/database");

async function authenticateToken(req, res, next) {
  const authHead = req.headers.authorization;
  const token = authHead && authHead.split(" ")[1];

  const signed = await isUserLogIn(req.body.id, req.body.email);

  if (req.method !== "GET") {
    if (!token || !signed) return res.sendStatus(401);
  } else {
    if (!token) return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWTSECRET, async (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

async function isUserLogIn(userId, email) {
  try {
    const query = await database.query(
      `select * from users where id=? or email=?  limit 1`,
      [userId, email]
    );
    const userData = query[0][0];
    const userSignedIn = userData.signed_in === 1;
    return userSignedIn;
  } catch (error) {
    return false;
  }
}

module.exports = {
  authenticateToken,
};
