import express from "express";
const router = express.Router();

import {
  indexController,
  homeController,
  aboutController,
  contactController,
  factsController,
  footerController,
  portfolioController,
  reumeController,
  servicesController,
  skillController,
  testimonialsController,
  formController,
} from "../controllers/resumeController.js";
// import { aboutController } from "../controllers/aboutController.js";

// router.get("/hero", indexController);
router.get("/home", indexController);
router.get("/about", aboutController);
router.get("/contact", contactController);
router.get("/facts", factsController);
router.get("/footer", footerController);
router.get("/portfolio", portfolioController);
router.get("/resume", reumeController);
router.get("/services", servicesController);
router.get("/skill", skillController);
router.get("/testimonials", testimonialsController);
router.get("/form", formController);

export default router;
