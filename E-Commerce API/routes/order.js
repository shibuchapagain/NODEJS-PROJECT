const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Order = require("./../models/Order");

// Get User Cart
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json({
      status: "success",
      result: cart.length,
      message: "Here is your cart",
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// Get All Carts
router.get("/", verifyToken, async (req, res) => {
  const qNew = req.query.new;
  try {
    let carts;
    if (qNew) {
      carts = await Cart.find().sort({ createdAt: -1 }).limit(1);
    } else {
      carts = await Cart.find();
    }
    res.status(200).json({
      status: "success",
      result: carts.length,
      data: {
        carts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// Create a New Order...
router.post("/create", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  // console.log(newOrder);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({
      status: "success",
      message: "Successfully add a new Order.",
      data: {
        data: savedOrder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// Get a Specific Cart
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Successfully get the data",
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// Update a Cart
router.patch("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(req.params.id, req.body);
    res.status(202).json({
      status: "success",
      message: "Update Cart Successfully",
      data: {
        updateCart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// Delete a Cart
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(202).json({
      status: "success",
      message: "Delete Cart Successfully",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

module.exports = router;
