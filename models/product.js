module.exports = class Product {
  constructor(
    id,
    name,
    price,
    quantity,
    brand_id,
    category_id,
    discount,
    images
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.brand_id = brand_id;
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
      brand_id: this.brand_id,
      category_id: this.category_id,
      discount: this.discount,
      images: this.images,
    };
  }
};
