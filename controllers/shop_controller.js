const db = require("../utils/resources/database");
const dbQueries = require("../utils/constants/sql_queries");

async function addProductToCart(cartData) {
  try {
    const query = dbQueries.addProductToCart;
    const response = await db.query(query, [
      cartData.product_id,
      cartData.user_id,
      cartData.variant,
      cartData.quantity,
    ]);
    return response;
  } catch (error) {
    throw error;
  }
}

async function addOrder(data) {
  try {
    const query = dbQueries.addOrder;
    const orderData = data["data"];
    const response = await db.query(query, [
      orderData["user_id"],
      orderData["order_date"],
      orderData["delivery_location"],
      orderData["cart"],
      orderData["total_cost"],
    ]);
    return response;
  } catch (error) {
    throw error;
  }
}

async function getProducts(userId) {
  const query = dbQueries.fetchAllProductsQuery(userId);
  const databaseResult = await db.execute(query);
  return databaseResult[0];
}
async function getProductsProductsByCategory(id, userId) {
  const query = dbQueries.fetchProductsByCategory(id, userId);
  const databaseResult = await db.execute(query);
  return databaseResult;
}
async function getProductsProductsByBrand(id, userId) {
  const query = dbQueries.fetchProductsByBrand(id, userId);
  const databaseResult = await db.execute(query);
  return databaseResult;
}
async function getBrands() {
  const result = await db.execute(dbQueries.fetchAllBrands);
  return result;
}
async function getCategories() {
  const result = await db.execute(dbQueries.fetchAllCategories);
  return result;
}

async function getUserCart(userId) {
  const query = dbQueries.fetchUserCart(userId);
  const result = await db.execute(query);
  return result;
}

async function removeFromCart(userId, product_id) {
  const query = dbQueries.removeFromCart(userId, product_id);
  try {
    const response = await db.execute(query);
    return response;
  } catch (error) {
    throw error;
  }
}

async function editCartitemQuantity(userId, productId, quantity) {
  const query = dbQueries.updateCartitemQuantity(userId, productId, quantity);
  try {
    const response = await db.execute(query);
    return response;
  } catch (error) {
    throw error;
  }
}

async function rateProduct(data) {
  const query = dbQueries.rateProduct(data);
  try {
    const response = await db.execute(query);
    return response.toString();
  } catch (error) {
    throw error;
  }
}
async function removeSavedProduct(data) {
  const query = dbQueries.removeSavedProduct(data);
  try {
    const response = await db.execute(query);
    return response.toString();
  } catch (error) {
    throw error;
  }
}

async function saveProduct(data) {
  const query = dbQueries.saveProduct(data);
  try {
    const response = await db.execute(query);
    return response.toString();
  } catch (error) {
    throw error;
  }
}

async function toggleFavorite(data) {
  const userId = data.user_id;
  const productId = data.product_id;

  try {
    const exists = await db.query(
      `Select * from favorites where user_id = ? and product_id = ?`,
      [userId, productId]
    );

    if (exists[0].length) {
      const deleteResponse = await db.query(
        `delete from favorites where product_id = ${productId} and user_id = ${userId}`
      );
      return {
        is_favorite: false,
        msg: deleteResponse[0],
      };
    }
    const insertResponse = await db.query(
      `insert into favorites(product_id,user_id) values (${productId},${userId})`
    );

    return {
      is_favorite: true,
      msg: insertResponse[0],
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addProductToCart,
  addOrder,
  editCartitemQuantity,
  getProducts,
  getBrands,
  getCategories,
  getProductsProductsByCategory,
  getProductsProductsByBrand,
  getUserCart,
  removeFromCart,
  rateProduct,
  removeSavedProduct,
  saveProduct,
  toggleFavorite,
};
