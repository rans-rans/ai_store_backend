const express = require("express");
const shopController = require("../../controllers/shop_controller");

const router = express.Router();

router.get("/fetch-products", async function (req, res) {
  const allProducts = await shopController.getProducts();
  res.send(JSON.stringify(allProducts[0]));
});

router.post("/fetch-category-products", async function (req, res) {
  const categoryId = req.body.id;
  const products = await shopController.getProductsProductsByCategory(
    categoryId
  );
  res.send(JSON.stringify(products[0]));
});

router.post("/fetch-brand-products", async function (req, res) {
  const brandId = req.body.id;
  const products = await shopController.getProductsProductsByBrand(brandId);
  res.send(JSON.stringify(products[0]));
});

router.get("/fetch-brands", async function (req, res) {
  const brands = await shopController.getBrands();
  res.send(JSON.stringify(brands[0]));
});

router.get("/fetch-categories", async function (req, res) {
  const categories = await shopController.getCategories();
  res.send(JSON.stringify(categories[0]));
});

router.post("/add-to-cart", async function (req, res) {
  const cartItem = req.body;
  shopController
    .addProductToCart(cartItem)
    .then((response) => {
      res.send({ status: "success", message: response });
    })
    .catch((error) => {
      res.send({ status: "failed", message: error });
    });
});

router.post("/fetch-user-cart", async function (req, res) {
  const userId = req.body["user_id"];
  const cart = await shopController.getUserCart(userId);
  res.send(cart[0]);
});
router.post("/remove-from-cart", async function (req, res) {
  const userId = req.body["user_id"];
  const productId = req.body["product_id"];
  shopController
    .removeFromCart(userId, productId)
    .then((response) => {
      res.send({
        status: "success",
        message: response,
      });
    })
    .catch((error) => {
      res.send({
        status: "failed",
        message: error,
      });
    });
});

module.exports = router;
