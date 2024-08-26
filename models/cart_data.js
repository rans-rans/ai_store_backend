module.exports = class CartItem {
    constructor(
      product_id,
      user_id,
      quantity,
      variant,     
    ) {
      this.product_id = product_id;
      this.user_id = user_id;
      this.quantity = quantity
    }
  };
  