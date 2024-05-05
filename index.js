const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const shopRoutes = require("./routes/shop/shop");
const adminRoutes = require("./routes/admin/admin");
const authRoutes = require("./routes/auth/auth");

app.get("/", (req, res) => {
  res.send("Let there be light, and there was light");
});

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT || 3000);
