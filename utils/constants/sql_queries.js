const addProductToCart = `
  INSERT INTO
  cart_items (product_id, user_id, variant, quantity) 
  VALUES (?,?,?,?)`;

const addOrder = `
  INSERT INTO
  orders (user_id,date,location,cart,total_cost)
  VALUES  (?,?,?,?,?)
  `;

function fetchProductsByCategory(categoryId, userId) {
  const products = fetchAllProductsQuery(userId);
  return products + ` WHERE category_id = ${categoryId}`;
}
function fetchProductsByBrand(brandId, userId) {
  const products = fetchAllProductsQuery(userId);
  return products + ` WHERE brand_id = ${brandId}`;
}

function fetchAllProductsQuery(userId) {
  return `
SELECT 
  p.id,
  p.name,
  p.price,
  p.quantity,
  p.brand_id,
  p.category_id,
  b.name AS brand_name,
  c.name AS category_name,
  p.discount,
  p.images,
  p.description,
  p.variants,
  CASE
    WHEN f.user_id IS NOT NULL THEN TRUE
    ELSE FALSE
  END AS is_favorite
FROM 
  products p
JOIN 
  brands b ON p.brand_id = b.id
JOIN 
  categories c ON p.category_id = c.id
LEFT JOIN
  favorites f ON p.id = f.product_id AND f.user_id = ${userId} 
`;
}

function fetchUserCart(userId) {
  return `
  SELECT 
    p.name,
    p.price,
    p.discount,
    p.id,
    p.images,
    ci.user_id,
    ci.variant,
    ci.quantity
FROM 
    cart_items ci
JOIN 
    products p ON ci.product_id = p.id
WHERE 
    ci.user_id = ${userId}
  `;
}

function removeFromCart(userId, productId) {
  return `
DELETE FROM cart_items
WHERE user_id = ${userId} 
AND product_id = ${productId}`;
}

function updateCartitemQuantity(userId, productId, quantity) {
  return `
  UPDATE cart_items
SET quantity =  ${quantity}
WHERE user_id = ${userId}
AND product_id = ${productId}
AND quantity > 0; 
  `;
}

function rateProduct(data) {
  return `
  INSERT INTO
  ratings (product_id, user_id,score,comment,date_created)
  VALUES (${data.product_id},${data.user_id},${data.score},${data.comment},${data.date_created})
  `;
}

function removeSavedProduct(data) {
  return `
  DELETE FROM favorites WHERE (product_id = ${data.product_id}) and (user_id = ${data.user_id});
  `;
}

function saveProduct(data) {
  return `  
  INSERT INTO
  saved (product_id, user_id)
  VALUES (${data.product_id},${data.userId})
  `;
}

const fetchAllBrands = `
SELECT * from brands`;
const fetchAllCategories = `
SELECT * from categories`;

module.exports = {
  fetchAllProductsQuery,
  fetchAllBrands,
  fetchAllCategories,
  addProductToCart,
  addOrder,
  fetchProductsByBrand,
  fetchProductsByCategory,
  fetchUserCart,
  removeFromCart,
  updateCartitemQuantity,
  rateProduct,
  removeSavedProduct,
  saveProduct,
};
