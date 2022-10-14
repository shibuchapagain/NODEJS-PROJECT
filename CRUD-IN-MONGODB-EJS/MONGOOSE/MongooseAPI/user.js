// Here we define SCHEMA and MODEL of the USER
const mongoose = require("mongoose");

// to create a schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  address: String,
});

module.exports = mongoose.model("datas", userSchema);
