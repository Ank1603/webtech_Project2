const mongoose = require("mongoose");
async function dbconnect() {
  var connection = await mongoose.connect("mongodb://127.0.0.1:27017/userdetails" );

  return connection;
}
module.exports = dbconnect;


   