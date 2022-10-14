const express = require("express");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const User = require("./../models/User");
const router = express.Router();

// GET ALL USERS
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  const query = req.query.new; // to get the fixed number of users at a time
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// GET SPECIFIC USER
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Successfully deleted",
      data: null,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
