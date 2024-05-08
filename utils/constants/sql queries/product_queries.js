const addProductToCart = `
  INSERT INTO
  cart_items (product_id, user_id, variant, quantity) 
  VALUES (?,?,?,?)`;

const fetchAllProductsQuery = `
SELECT 
    p.id,
    p.name,
    p.price,
    p.discount,
    p.quantity,
    p.brand_id,
    p.category_id,
    IFNULL(avg_score, -1) AS rating_score,
    JSON_UNQUOTE(JSON_EXTRACT(p.images, '$[0]')) as image
FROM 
    products p
LEFT JOIN (
    SELECT 
        product_id,
        AVG(score) AS avg_score
    FROM 
        ratings
    GROUP BY 
        product_id
) AS r ON p.id = r.product_id`;

const ratings = `
select *  from  ratings
`;

const fetchProductDetails = `
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
      favorites f ON p.id = f.product_id AND f.user_id = ?
    WHERE p.id = ?
  `;

const fetchProductsByCategory =
  fetchAllProductsQuery + ` WHERE category_id = ?`;

const fetchProductsByBrand = fetchAllProductsQuery + ` WHERE brand_id = ?`;

const fetchUserCart = `
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
    ci.user_id = ?
  `;

const removeFromCart = `
DELETE FROM cart_items
WHERE user_id = ?
AND product_id = ?`;

const updateCartitemQuantity = `
  UPDATE cart_items
SET quantity =  ?
WHERE user_id = ?
AND product_id = ? 
AND quantity > 0; 
  `;

const rateProduct = `
  INSERT INTO
  ratings (product_id, user_id,score,comment,date_created)
  VALUES (?,?,?,?,?)
  `;

const removeSavedProduct = `
  DELETE FROM favorites WHERE (product_id = ?) and (user_id = ?);
  `;

const saveProduct = `  
  INSERT INTO
  saved (product_id, user_id)
  VALUES (?,?)
  `;

const fetchAllBrands = `
SELECT * from brands`;
const fetchAllCategories = `
SELECT * from categories`;

module.exports = {
  addProductToCart,
  fetchAllProductsQuery,
  fetchAllBrands,
  fetchAllCategories,
  fetchProductDetails,
  fetchProductsByBrand,
  fetchProductsByCategory,
  fetchUserCart,
  removeFromCart,
  updateCartitemQuantity,
  rateProduct,
  removeSavedProduct,
  saveProduct,
};
