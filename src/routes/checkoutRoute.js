import express from "express";
import {
  addToCheckout,
  getAllPendingCheckout,
  getAllRentedCheckout,
  getAllFinishedCheckout,
  getAllCanceledCheckout,
  getAllDataCheckout,
  getAllPendingCheckoutByUser,
  getAllRentedCheckoutByUser,
  getAllFinishedCheckoutByUser,
  getAllCanceledCheckoutByUser,
  approveOrder,
  cancelOrder,
  finishOrder,
} from "../controllers/checkoutController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", authenticate, addToCheckout);
router.get("/allpending", authenticate, isAdmin, getAllPendingCheckout);
router.get("/allrented", authenticate, isAdmin, getAllRentedCheckout);
router.get("/allfinished", authenticate, isAdmin, getAllFinishedCheckout);
router.get("/allcanceled", authenticate, isAdmin, getAllCanceledCheckout);
router.get("/all/by-user", authenticate, getAllDataCheckout);
router.get("/pending/by-user", authenticate, getAllPendingCheckoutByUser);
router.get("/rented/by-user", authenticate, getAllRentedCheckoutByUser);
router.get("/finished/by-user", authenticate, getAllFinishedCheckoutByUser);
router.get("/canceled/by-user", authenticate, getAllCanceledCheckoutByUser);
router.put("/approved/by-orderid/:id", authenticate, isAdmin, approveOrder);
router.put("/canceled/by-orderid/:id", authenticate, cancelOrder);
router.put("/finished/by-orderid/:id", authenticate, isAdmin, finishOrder);

export default router;
