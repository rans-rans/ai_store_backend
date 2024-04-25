const express = require("express");
const router = express.Router();

router.post("add-product", (req, res) => {});
router.post("remove-product", (req, res) => {});
router.post("edit-product", (req, res) => {});

router.get("/fetch-products", (req, res) => {});

module.exports = router;
