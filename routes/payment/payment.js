const express = require("express");
const paymentController = require("../../controllers/payments_controller");

const router = express.Router();

router.post("/order", async (req, res) => {
  const orderData = req.body;
  const paymentStatus = orderData.event;
  const successMsg = [
    "paymentrequest.success",
    "charge.success",
    "transfer.success",
  ];
  const paymentSuccess = successMsg.includes(paymentStatus);

  if (paymentSuccess) {
    //this contains the actual data of the order placed
    const metaData = orderData["data"].metadata;
    const  totalCost=orderData['data'].amount
    try {
      //first insert  into orders
      await paymentController.addToOrders(metaData,totalCost);
      //then into payments
      await paymentController.addToPayments(
        metaData,
        orderData.data.reference,
        orderData.data.id.toString(),
        totalCost,
      );
      res.sendStatus(200);
      //now take out each product from the store
      const cart = JSON.parse(metaData.cart);
      await paymentController.completeOrder(cart);
      //remove those items from user cart
      console.log(`user id  is  ${metaData.id}`)
      await paymentController.clearCart(metaData.id);
      console.log("everything   successful🫡🫡🫡🫡🫡")
    } catch (error) {
      console.log(`error  in  payment.js  ${error}`);
      throw error;
    }
  }
});

module.exports = router;
