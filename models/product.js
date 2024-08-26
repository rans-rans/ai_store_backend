module.exports = class Product {
  constructor(
    id,
    name,
    price,
    quantity,
    category_id,
    discount,
    images
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category_id = category_id;
    this.discount = discount;
    this.images = images;
  }

  toMap() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      category_id: this.category_id,
      discount: this.discount,
      images: this.images,
    };
  }
};
