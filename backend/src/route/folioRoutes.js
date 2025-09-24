import express from "express";
import {
  getFolio,
  createFolio,
  updateFolio,
  deleteFolio,
} from "../controller/folioController.js";

const router = express.Router();

// Get a folio by user_id
router.get("/:id", getFolio);

// Create a new folio
router.post("/", createFolio);

// Update a folio by user_id
router.put("/:id", updateFolio);

// Delete a folio by user_id
router.delete("/:id", deleteFolio);

export {router}
