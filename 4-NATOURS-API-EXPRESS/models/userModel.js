const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    // trim: true,
    // maxLength: [25, "A user name must have less or equal then 25 character"],
    // minLength: [5, "A user name must have greater than 5 character"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    // trim: true,
    // maxLength: [12, "A user email must have less or equal then 12 character"],
    // minLength: [7, "A user email must have greater than 7 character"],
  },
  photo: {
    type: String,
    // required: [true, "A user must have a photo"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    // This only works on CREATE and SAVE!!!
    validate: {
      validator: function (el) {
        return el === this.password; // abc===abc --> then return true otherwise false ...
      },
      message: "Password are not same",
    },
  },
});

// ENCRYPT / HASH THE PASSWORD ...
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
