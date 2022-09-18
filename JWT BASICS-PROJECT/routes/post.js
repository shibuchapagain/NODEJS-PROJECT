const router = require("express").Router();
const User = require("../model/User");
const verify = require("./verifytoken");

router.get("/", verify, (req, res) => {
  // res.send({
  //   post: { title: "my post", description: "made my shibu chapagain" },
  // });
  res.send(req.user);
  User.findOne({ _id: req.user });
});

module.exports = router;
