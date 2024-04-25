const express = require("express");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


const shopRoutes = require("./routes/shop/shop");
const adminRoutes = require("./routes/admin/admin");
const authRoutes = require("./routes/auth/auth");

app.use("/shop", shopRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);


app.listen(3000);
