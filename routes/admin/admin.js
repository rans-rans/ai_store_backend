const express = require("express");

const adminController = require("../../controllers/admin_controller");

const router = express.Router();

router.post("/add-product", (req, res) => {
  const productData = req.body;
  adminController
    .addProduct(productData)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/add-category", (req, res) => {
  const data = req.body;
  const categoryName = data["category_name"];
  const categoryImage = data["category_img"];
  adminController
    .addCategory(categoryName, categoryImage)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/fetch-categories", async (req, res) => {
  const data = await adminController.fetchCategories();
  res.send(data);
});

router.post("/edit-product", (req, res) => {});

router.get("/fetch-products", (req, res) => {});
router.post("/remove-product", (req, res) => {});

module.exports = router;
