const addProductToCart = `
  INSERT INTO
  cart_items (product_id, user_id, quantity) 
  VALUES (?,?,?)`;

const fetchAllCategories = `
SELECT * from categories`;

const fetchAllProductsQuery = `
SELECT 
    p.id,
    p.name,
    p.price,
    p.discount,
    p.quantity,
    p.category_id,
    p.images,
    IFNULL(avg_score, -1) AS rating_score
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

const fetchProductDetails = `
    SELECT 
      p.id,
      p.name,
      p.price,
      p.quantity,
      c.name AS category_name,
      p.discount,
      p.images,
      IFNULL(avg_score, -1) AS rating_score,
      p.description,
      CASE
        WHEN f.user_id IS NOT NULL THEN TRUE
        ELSE FALSE
      END AS is_favorite
    FROM 
      products p
    JOIN 
      categories c ON p.category_id = c.id
    LEFT JOIN (
        SELECT product_id,AVG(score) AS avg_score
        FROM ratings
        GROUP BY product_id
    ) AS r ON p.id = r.product_id
    LEFT JOIN
      favorites f ON p.id = f.product_id AND f.user_id = ?
    WHERE p.id = ?
  `;

const fetchProductsByCategory = `${fetchAllProductsQuery} WHERE category_id = ?`;


const fetchProductRatings = `
select * from  ratings
where product_id = ?
`;

const fetchUserCart = `
  SELECT 
    p.name,
    p.price,
    p.discount,
    p.id,
    p.images,
    ci.user_id,
    ci.quantity
FROM 
    cart_items ci
JOIN 
    products p ON ci.product_id = p.id
WHERE 
    ci.user_id = ?
  `;

  const fetchUserOrders=`
  select * from orders where user_id = ?
  `

const rateProduct = `
  INSERT INTO
  ratings (product_id, user_id,score,comment,date_created)
  VALUES (?,?,?,?,?)
  `;

const removeFromCart = `
DELETE FROM cart_items
WHERE user_id = ?
AND product_id = ?`;

const removeProductRating = `
delete from ratings where 
product_id = ? and user_id = ?
`;

const removeSavedProduct = `
  DELETE FROM favorites WHERE (product_id = ?) and (user_id = ?);
  `;

const saveProduct = `  
  INSERT INTO
  saved (product_id, user_id)
  VALUES (?,?)
  `;

const updateCartitemQuantity = `
  UPDATE cart_items
SET quantity =  ?
WHERE user_id = ?
AND product_id = ? 
AND quantity > 0; 
  `;

module.exports = {
  addProductToCart,
  fetchAllProductsQuery,
  fetchAllCategories,
  fetchProductDetails,
  fetchProductRatings,
  fetchProductsByCategory,
  fetchUserCart,
  fetchUserOrders,
  rateProduct,
  removeSavedProduct,
  removeFromCart,
  removeProductRating,
  saveProduct,
  updateCartitemQuantity,
};
