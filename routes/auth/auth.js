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
        message: "User creation successful",
        token: token,
        user: response.user,
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
router.post("/login", async (req, res) => {
  try {
    const user = await controller.login(req.body.email);
    if (user === undefined) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    const passwordHash = await bcrypt.hash(user.password, 10);
    const token = jwt.sign(
      {
        email: user.email,
        password: passwordHash,
      },
      process.env.JWTSECRET
    );

    if (passwordCorrect) {
      return res.send({
        user: user,
        token: token,
        message: "login successful",
      });
    }
    return res.status(401).json({ message: "invalid credentials" });
  } catch (error) {
    res.send({
      error: error,
    });
  }
});

router.post("/logout", authMiddleware.authenticateToken, async (req, res) => {
  const userId = req.body.id;
  try {
    await controller.logout(userId);
    return res.send("user logout success");
  } catch (error) {
    res.send({
      error: "internal server error",
    });
  }
});

module.exports = router;
