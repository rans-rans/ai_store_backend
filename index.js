const express = require("express");
const http = require("http");
const socketIo = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

require("./sockets/search_socket")(io,'/shop/text-search');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const adminRoutes = require("./routes/admin/admin");
const authRoutes = require("./routes/auth/auth");
const paymentRoutes = require("./routes/payment/payment");
const shopRoutes = require("./routes/shop/shop");

app.get("/", (req, res) => {
  res.send("Let there be light, and there was light");
});

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/payment", paymentRoutes);
app.use("/shop", shopRoutes);

server.listen(process.env.PORT || 3000);
