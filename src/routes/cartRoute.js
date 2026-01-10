import express from "express";
import {
  addToCart,
  getAllCart,
  updateCart,
  deleteCartItem,
  checkoutSelectedItems,
} from "../controllers/cartController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, addToCart);
router.get("/", authenticate, getAllCart);
router.put("/by-id/:id", authenticate, updateCart);
router.delete("/by-id/:id", authenticate, deleteCartItem);
router.post("/checkout", authenticate, checkoutSelectedItems);

export default router;
