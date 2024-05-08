const database = require("../utils/resources/database");
const dbQueries = require("../utils/constants/sql queries/product_queries");

async function addProductToCart(cartData) {
  try {
    const query = dbQueries.addProductToCart;
    const response = await database.query(query, [
      cartData.product_id,
      cartData.id,
      cartData.variant,
      cartData.quantity,
    ]);
    return response;
  } catch (error) {
    throw error;
  }
}

async function editCartitemQuantity(userId, productId, quantity) {
  const query = dbQueries.updateCartitemQuantity;
  try {
    const response = await database.query(query, [
      quantity,
      userId,
      productId,
    ]);
    return response;
  } catch (error) {
    throw error;
  }
}

async function getProducts(userId) {
  const query = dbQueries.fetchAllProductsQuery;
  const databaseResult = await database.query(query, [userId]);
  return databaseResult[0];
}
async function getProductsProductsByCategory(categoryId, userId) {
  const query = dbQueries.fetchProductsByCategory;
  const databaseResult = await database.query(query, [userId, categoryId]);
  return databaseResult;
}
async function getProductsProductsByBrand(categoryId, userId) {
  const query = dbQueries.fetchProductsByBrand;
  const databaseResult = await database.query(query, [userId, categoryId]);
  return databaseResult;
}
async function getBrands() {
  const result = await database.execute(dbQueries.fetchAllBrands);
  return result;
}
async function getCategories() {
  const result = await database.execute(dbQueries.fetchAllCategories);
  return result;
}

async function getUserCart(userId) {
  const query = dbQueries.fetchUserCart;
  const result = await database.query(query, [userId]);
  return result;
}

async function rateProduct(data) {
  const query = dbQueries.rateProduct;
  try {
    const response = await database.query(query, [
      data.product_id,
      data.id,
      data.score,
      data.comment,
      data.date_created,
    ]);
    return response.toString();
  } catch (error) {
    throw error;
  }
}

async function removeFromCart(userId, product_id) {
  const query = dbQueries.removeFromCart;
  try {
    const response = await database.query(query, [userId, product_id]);
    return response;
  } catch (error) {
    throw error;
  }
}

async function removeSavedProduct(data) {
  const query = dbQueries.removeSavedProduct;
  try {
    const response = await database.query(query, [data.product_id, data.id]);
    return response.toString();
  } catch (error) {
    throw error;
  }
}

async function saveProduct(data) {
  const query = dbQueries.saveProduct;
  try {
    const response = await database.query(query, [data.product_id, data.id]);
    return response.toString();
  } catch (error) {
    throw error;
  }
}

async function toggleFavorite(data) {
  const userId = data.id;
  const productId = data.product_id;

  try {
    const exists = await database.query(
      `Select * from favorites where user_id = ? and product_id = ?`,
      [userId, productId]
    );

    if (exists[0].length) {
      const deleteResponse = await database.query(
        `delete from favorites where product_id = ? and user_id = ?`,
        [productId, userId]
      );
      return {
        is_favorite: false,
        msg: deleteResponse[0],
      };
    }
    const insertResponse = await database.query(
      `insert into favorites(product_id,user_id) values (?,?)`,
      [productId, userId]
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
