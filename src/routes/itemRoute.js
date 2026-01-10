import express from "express";
import multer from "multer";
import {
  createItem,
  getItemAll,
  getItemById,
  getItemByCategoryId,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "src/uploads/items"),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });
const router = express.Router();

router.post(
  "/",
  authenticate,
  isAdmin,
  upload.array("image_url", 5),
  createItem
);
router.get("/all", authenticate, getItemAll);
router.get("/by-id/:id", authenticate, getItemById);
router.get("/by-categoryid/:category_id", authenticate, getItemByCategoryId);
router.put(
  "/by-id/:id",
  authenticate,
  isAdmin,
  upload.array("image_url", 5),
  updateItem
);
router.delete("/by-id/:id", authenticate, isAdmin, deleteItem);

export default router;
