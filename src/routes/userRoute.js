import express from "express";
import multer from "multer";
import {
  register,
  login,
  getUserAll,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "src/uploads/photos"),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", authenticate, isAdmin, getUserAll);
router.get("/by-id/:id", authenticate, getUserById);
router.put("/by-id/:id", upload.single("image_url"), authenticate, updateUser);
router.delete("/by-id/:id", authenticate, isAdmin, deleteUser);

export default router;
