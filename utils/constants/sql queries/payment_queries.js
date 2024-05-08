const insertOrder = `
insert into  
 orders   (user_id,date,location,items,customer_name,total_cost)
 values (?,?,?,?,?,?)
 `;

const insertPayments = `
 insert into 
 payments  (date,amount,user_id,reference,payment_id)
 values (?,?,?,?,?)
 `;

const completeOrder = `
 update products
 set  quantity = quantity - ?
 where  id=?
 `;

const clearCart = `
delete from
cart_items
where user_id = ?
`;

module.exports = {
  clearCart,
  completeOrder,
  insertPayments,
  insertOrder,
};
