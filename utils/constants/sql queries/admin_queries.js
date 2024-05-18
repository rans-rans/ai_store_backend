const addBrand = `
insert into brands (name,image_url)
values (?,?);
`;
const addCategory = `
insert into categories (name,image_url)
values (?,?);
`;

module.exports = {
  addBrand,
  addCategory,
};
