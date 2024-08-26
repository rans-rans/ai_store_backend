const addCategory = `
insert into categories (name,image_url)
values (?,?);
`;

const addProduct = `
insert  into  products
(id,name,description,category_id,quantity,price,images,discount)
values (?,?,?,?,?,?,?,?,?,?)
`;

module.exports = {
  addCategory,
  addProduct,
};
