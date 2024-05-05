const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const controller = require("../../controllers/auth_controller");
const authMiddleware = require("../../middlewares/auth_middleware");

const router = express.Router();

//endpoint to create account using email and password
router.post("/create-user", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = { email: email, password: passwordHash };
  controller
    .createAccount(user)
    .then((response) => {
      const token = jwt.sign(user, process.env.JWTSECRET);
      res.status(201).json({
        userId: response.userId,
        token: token,
        message: "User creation successful",
      });
    })
    .catch((error) => {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json("email already exist");
      }
      res.send(error);
    });
});

//end-point to log in the user
router.post("/login", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const user = await controller.login(req.body);
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordCorrect) {
      return res.send({
        id: user.id,
        login: true,
        message: "login successful",
      });
    }
    return res
      .status(401)
      .json({ login: false, message: "invalid credentials" });
  } catch (error) {
    res.send({
      error: error,
    });
  }
});

module.exports = router;
