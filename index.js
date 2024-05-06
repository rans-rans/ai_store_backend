const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const adminRoutes = require("./routes/admin/admin");
const authRoutes = require("./routes/auth/auth");
const paymentRoutes = require("./routes/payment/payment");
const shopRoutes = require("./routes/shop/shop");

app.get("/", (req, res) => {
  res.send("Let there be light, and there was light");
});

app.post("/", (req, res) => {
  console.log(req.body);
});

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/payment", paymentRoutes);
app.use("/shop", shopRoutes);

app.listen(process.env.PORT || 3000);
