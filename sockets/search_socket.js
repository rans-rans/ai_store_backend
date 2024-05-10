const database = require("../utils/resources/database");
const dbQuery = require("../utils/constants/sql queries/product_queries");

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("search", async (query) => {
      const baseQuery = dbQuery.fetchAllProductsQuery;
      const data = `'%${query}%'`;

      const searchQuery = `
            ${baseQuery} where name like ${data}
            `;
      const results = await database.execute(searchQuery);

      socket.emit("sr", results[0]);
    });
  });
};
