const express = require("express");

const router = express.Router();

router.post("/order", async (req, res) => {
  const orderData = req.body;
});

module.exports = router;
