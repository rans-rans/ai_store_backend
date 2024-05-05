const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHead = req.headers.authorization;
  const token = authHead && authHead.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWTSECRET, async (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
