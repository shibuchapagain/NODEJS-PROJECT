// import express from "express";
const express = require("express");
const router = express.Router();

// import {
//   homeController,
//   formController,
//   saveController,
// } from "../controllers/homeController.js";
const {
  homeController,
  formController,
  saveController,
} = require("../controllers/homeController");

router.get("/", homeController);
router.get("/new", formController);
router.get("/save", saveController);

// export default router;
module.exports = router;
