const express = require("express");
const shopController = require("../../controllers/shop_controller");
const authMiddleware = require("../../middlewares/auth_middleware");

const router = express.Router();

// router.use(authMiddleware.authenticateToken);

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


router.post("/fetch-category-products", async function (req, res) {
  const categoryId = req.body["category_id"];
  const products = await shopController.getProductsProductsByCategory(
    categoryId
  );
  res.send(products);
});

router.post("/fetch-product-ratings", async (req, res) => {
  const data = req.body;
  const ratings = await shopController.getProductRatings(data["product_id"]);
  res.send(ratings);
});

router.get("/fetch-products", async function (req, res) {
  console.log('hello')
  try {
    
    const allProducts = await shopController.getProducts();
    res.send(allProducts);
  } catch (error) {
    console.log(error)
  }
});


router.get("/fetch-categories", async function (req, res) {
  const categories = await shopController.getCategories();
  res.send(categories[0]);
});

router.post("/fetch-product-details", async function (req, res) {
  const productId = req.body["product_id"];
  const userId = req.body["user_id"];

  shopController
    .getProductDetails(productId, userId)
    .then((details) => {
      res.send(details);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/fetch-user-cart", async function (req, res) {
  const userId = req.body.id;
  const cart = await shopController.getUserCart(userId);
  res.send(cart[0]);
});

router.post("/fetch-user-orders", (req, res) => {
  shopController.getUserOrders(req.body.id)
    .then((orders) => {
      res.send(orders);
    })
    .catch((error) => {
      res.send(error);
    });
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

router.post("/rate-product", async function (req, res) {
  const data = req.body;
  shopController
    .rateProduct(data)
    .then((response) => {
      res.send({
        status: true,
        message: response,
      });
    })
    .catch((error) => {
      res.status(504).send({
        status: false,
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

router.post("/remove-product-rating", (req, res) => {
  const data = req.body;
  shopController
    .removeProductRating(data["product_id"], data["id"])
    .then((_) => {
      res.send({
        status: true,
        message: "Rating removed successfully",
      });
    })
    .catch((_) => {
      res.send({
        status: false,
        message: "Unable to remove rating",
      });
    });
});

router.post("/remove-saved-product", (req, res) => {
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
