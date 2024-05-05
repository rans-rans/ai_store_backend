const express = require("express");

const authMiddleware = require("../../middlewares/auth_middleware");

const router = express.Router();

router.use(authMiddleware.authenticateToken);

router.post("add-product", (req, res) => {});
router.post("remove-product", (req, res) => {});
router.post("edit-product", (req, res) => {});

router.get("/fetch-products", (req, res) => {});

module.exports = router;
