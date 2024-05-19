const addBrand = `
insert into brands (name,image_url)
values (?,?);
`;
const addCategory = `
insert into categories (name,image_url)
values (?,?);
`;

const addProduct = `
insert  into  products
(id,name,description,category_id,brand_id,quantity,price,images,variants,discount)
values (?,?,?,?,?,?,?,?,?,?)
`;

module.exports = {
  addBrand,
  addCategory,
  addProduct,
};
