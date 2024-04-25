const db = require("../utils/resources/database");
const dbQueries = require("../utils/constants/sql_queries");

async function getProducts() {
  const databaseResult = await db.execute(dbQueries.fetchAllProductsQuery);
  return databaseResult;
}
async function getProductsProductsByCategory(id) {
  const query = dbQueries.fetchProductsByCategory(id);
  const databaseResult = await db.execute(query);
  return databaseResult;
}
async function getProductsProductsByBrand(id) {
  const query = dbQueries.fetchProductsByBrand(id);
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

async function addProductToCart(cartData) {
  try {
    const query = dbQueries.addProductToCart(cartData);
    await db.execute(query);
    return "query success";
  } catch (error) {
    throw error;
  }
}

async function getUserCart(userId) {
  const query = dbQueries.fetchUserCart(userId);
  const result = await db.execute(query);
  return result;
}

async function removeFromCart(userId, product_id) {
  const query = dbQueries.removeFromCart(userId, product_id);
  try {
    await db.execute(query);
    return "query success";
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addProductToCart,
  getProducts,
  getBrands,
  getCategories,
  getProductsProductsByCategory,
  getProductsProductsByBrand,
  getUserCart,
  removeFromCart
};
