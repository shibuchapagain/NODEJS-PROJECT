const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const User = require("../model/User");
const { registerValidationSchema, logginValidation } = require("../validation");

router.get("/", async (req, res) => {
  const data = await User.find();
  res.send(data);
});

router.post("/register", async (req, res) => {
  // use async cause save to db may take couple of sec...
  // lets validate the data before create a new user ...
  const { error } = registerValidationSchema.validate(req.body);
  // res.send(error.details[0].message);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // check the email is that already exits in database or not ..
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email has been already exist");

  // hash password ...
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    // res.status(200).json({
    //   status: "Success",
    //   savedUser,
    // });
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Unable to save on database",
    });
  }
});

// for logging ...
router.post("/login", async (req, res) => {
  const { error } = logginValidation.validate(req.body);
  // res.send(error.details[0].message);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // check is email already exist or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email is not correct");

  // check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  // create and assign a token
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);

  res.send("Logged in");
});

module.exports = router;
