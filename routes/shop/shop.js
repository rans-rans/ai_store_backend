const express = require("express");
const shopController = require("../../controllers/shop_controller");
const authMiddleware = require("../../middlewares/auth_middleware");

const router = express.Router();

router.use(authMiddleware.authenticateToken);

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

router.post("/fetch-products", async function (req, res) {
  const userId = req.body.id;
  const allProducts = await shopController.getProducts(userId);
  res.send(allProducts);
});

router.post("/fetch-category-products", async function (req, res) {
  const categoryId = req.body.category_id;
  const userId = req.body.id;
  const products = await shopController.getProductsProductsByCategory(
    categoryId,
    userId
  );
  res.send(products[0]);
});

router.post("/fetch-brand-products", async function (req, res) {
  const userId = req.body.id;
  const brandId = req.body.brand_id;
  const products = await shopController.getProductsProductsByBrand(
    brandId,
    userId
  );
  res.send(products[0]);
});

router.get("/fetch-brands", async function (req, res) {
  const brands = await shopController.getBrands();
  res.send(brands[0]);
});

router.get("/fetch-categories", async function (req, res) {
  const categories = await shopController.getCategories();
  res.send(categories[0]);
});

router.post("/fetch-user-cart", async function (req, res) {
  const userId = req.body.id;
  const cart = await shopController.getUserCart(userId);
  res.send(cart[0]);
});

router.post("/edit-cartitem-quantity", async function (req, res) {
  const userId = req.body["id"];
  const productId = req.body["product_id"];
  const quantity = req.body["quantity"];

  shopController
    .editCartitemQuantity(userId, productId, quantity)
    .then((response) => {
      res.send({
        status: "success",
        message: response,
      });
    })
    .catch((error) => {
      res.send({
        status: "operation failed",
        message: error,
      });
    });
});

router.post("/remove-from-cart", async function (req, res) {
  const userId = req.body["id"];
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

router.post("/rate-product", async function (req, res) {
  const data = req.body;
  shopController
    .rateProduct(data)
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

router.post("/remove-saved-product", function (req, res) {
  const data = req.body;
  shopController
    .removeSavedProduct(data)
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

router.post("/save-product", function (req, res) {
  const data = req.body;
  shopController
    .saveProduct(data)
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

router.post("/toggle-favorite", function (req, res) {
  const data = req.body;
  shopController
    .toggleFavorite(data)
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
