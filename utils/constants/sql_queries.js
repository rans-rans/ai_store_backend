function addProductToCart(cartItem) {
  return `
  INSERT INTO
  cart_items (product_id, user_id, quantity, variant) 
  VALUES (${cartItem.product_id}, ${cartItem.user_id}, ${cartItem.quantity}, ${cartItem.variant});
  `;
}

function fetchProductsByCategory(categoryId) {
  return fetchAllProductsQuery + `WHERE category_id = ${categoryId}`;
}
function fetchProductsByBrand(brandId) {
  return fetchAllProductsQuery + `WHERE brand_id = ${brandId}`;
}

const fetchAllProductsQuery = `
SELECT 
  p.id,
  p.name,
  p.price,
  p.quantity,
  b.name AS brand_name,
  c.name AS category_name,
  p.discount,
  p.images,
  p.description,
  p.variants
FROM 
  products p
JOIN 
  brands b ON p.brand_id = b.id
JOIN 
  categories c ON p.category_id = c.id
`;

function fetchUserCart(userId) {
  return `
  SELECT 
    p.name,
    p.price,
    p.discount,
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

const fetchAllBrands = `
SELECT * from brands`;
const fetchAllCategories = `
SELECT * from categories`;

module.exports = {
  fetchAllProductsQuery,
  fetchAllBrands,
  fetchAllCategories,
  addProductToCart,
  fetchProductsByBrand,
  fetchProductsByCategory,
  fetchUserCart,
  removeFromCart,
};
