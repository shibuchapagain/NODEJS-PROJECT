const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// TO CONNECT DATABASE:
mongoose
  .connect("mongodb://localhost:27017/userManagement")
  .then(() => console.log("CONNECTED TO DATABASE."))
  .catch((err) => `COULD NOT CONNECT TO DATABASE: ${err}`);

// TO CREATE SCHEMA & MODEL FOR USERS:
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please tell us your fullName"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["root", "admin", "super", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
    select: true,
  },
});

// HASH THE PASSWORD AND SAVE IT ON DATABASE:
userSchema.pre("save", async function (next) {
  // hash the password at cost 12
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
