import express from "express";
const router = express.Router();
import {
  getAllRecord,
  getSpecificId,
  createNewRecord,
  updateRecord,
} from "../controllers/personController.js";
//
router.get("/", getAllRecord);
router.get("/:id", getSpecificId);
router.post("/", createNewRecord);
router.patch("/:id", updateRecord);

export default router;
