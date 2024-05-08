const database = require("../utils/resources/database");
const dbQueries = require("../utils/constants/sql queries/payment_queries");

async function addToOrders(params, totalCost) {
  try {
    const query = dbQueries.insertOrder;

    const response = await database.query(query, [
      params["id"],
      params["order_date"],
      params["delivery_location"],
      params["cart"],
      params["customer_name"],
      totalCost,
    ]);

    return response;
  } catch (error) {
    throw error;
  }
}
async function addToPayments(params, reference, paymentId, totalCost) {
  try {
    const query = dbQueries.insertPayments;
    const response = await database.query(query, [
      params["order_date"],
      totalCost,
      params["id"],
      reference,
      paymentId,
    ]);
    return response;
  } catch (error) {
    throw error;
  }
}

async function completeOrder(cart) {
  try {
    const query = dbQueries.completeOrder;
    await cart.forEach(async (item) => {
      await database.query(query, [item.quantity, item.product_id]);
    });
  } catch (error) {
    throw error;
  }
}

async function clearCart(user_id) {
  try {
    const query = dbQueries.clearCart;
    await database.query(query, [user_id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addToOrders,
  addToPayments,
  clearCart,
  completeOrder,
};
