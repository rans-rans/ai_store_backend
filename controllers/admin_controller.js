const database = require("../utils/resources/database");
const queries = require("../utils/constants/sql queries/admin_queries");

async function addBrand(name, imgUrl) {
  try {
    const insertQuery = queries.addBrand;
    const getId = `select last_insert_id() as brand_id from brands limit 1`;
    await database.query(insertQuery, [name, imgUrl]);
    const result = await database.execute(getId);
    const data = result[0];
    return {
      brand_id: data[0]["brand_id"],
    };
  } catch (error) {
    throw error;
  }
}

async function addCategory(name, imgUrl) {
  try {
    const insertQuery = queries.addCategory;
    const getId = `select last_insert_id() as category_id from categories limit 1`;
    await database.query(insertQuery, [name, imgUrl]);
    const result = await database.execute(getId);
    const data = result[0];
    return {
      category_id: data[0]["category_id"],
    };
  } catch (error) {
    throw error;
  }
}

async function addProduct(product) {
  try {
    const query = queries.addProduct;
    const result = await database.query(query, [
      product["id"],
      product["name"],
      product["description"],
      product["category_id"],
      product["brand_id"],
      product["quantity"],
      product["price"],
      product["images"],
      product["variants"],
      product["discount"],
    ]);
    console.log(result[0]);
    return result[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchBrands() {
  const query = "select * from brands order by	name";
  const data = await database.execute(query);
  const result = data[0];
  return result;
}

async function fetchCategories() {
  const query = "select * from categories order by	name";
  const data = await database.execute(query);
  const result = data[0];
  return result;
}

module.exports = {
  addBrand,
  addCategory,
  addProduct,
  fetchBrands,
  fetchCategories,
};
