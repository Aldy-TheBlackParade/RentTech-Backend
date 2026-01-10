import express from "express";
import {
  createCategory,
  getCategoryAll,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", authenticate, isAdmin, createCategory);
router.get("/all", authenticate, getCategoryAll);
router.get("/by-id/:id", authenticate, getCategoryById);
router.put("/by-id/:id", authenticate, isAdmin, updateCategory);
router.delete("/by-id/:id", authenticate, isAdmin, deleteCategory);

export default router;
