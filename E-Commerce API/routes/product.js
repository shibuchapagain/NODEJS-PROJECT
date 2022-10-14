const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Product = require("./../models/Product");

// Get All Products
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.categories;
  try {
    // const products = await Product.find();
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json({
      status: "success",
      result: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// Create a New Product...
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({
      status: "success",
      message: "Successfully add a new Product.",
      data: {
        data: savedProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// Get a Specific Product
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Successfully get the data",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// Update a Product
router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(202).json({
      status: "success",
      message: "Update Product Successfully",
      data: {
        updateProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// Delete a Product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(202).json({
      status: "success",
      message: "Delete Product Successfully",
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
