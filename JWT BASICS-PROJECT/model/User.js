const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 55,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    max: 55,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    max: 55,
    min: 5,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
