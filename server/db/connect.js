const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGO_URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MONGODB: connection error: "));
  db.once("open", function () {
    console.log("MONGODB: Connected successfully");
  });
};
