// Register and login is here...

const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // password: req.body.password,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      status: "success",
      result: savedUser.length,
      data: {
        savedUser,
      },
    });
  } catch (err) {
    // console.log(`ERROR : ${err}`);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json("WRONG CREDENTIALS");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("WRONG CREDENTIALS");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

module.exports = router;
