const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const shopRoutes = require("./routes/shop/shop");
const adminRoutes = require("./routes/admin/admin");
const authRoutes = require("./routes/auth/auth");

app.get("/", (req, res) => {
    console.log("working as expected")
  res.send("let there be light");
});

app.use("/shop", shopRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT || 3000);
