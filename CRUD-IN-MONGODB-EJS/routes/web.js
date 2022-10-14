// import express from "express";
const express = require("express");
const router = express.Router();

// import {
//   homeController,
//   formController,
//   saveController,
//   allRecord,
// } from "../controllers/homeController.js";

const homeController = require("../controllers/homeController");

router.get("/recordS", allRecord);
router.get("/", homeController.homeController);
router.get("/new", homeController.formController);
router.get("/save", homeController.saveController);

export default router;
