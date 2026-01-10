import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Format email salah" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password minimal 8 karakter, mengandung huruf besar, angka, dan tanpa spasi",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, email, password: hash });
    res.status(201).json({
      status: true,
      message: "Register success",
      data: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ message: "Username atau Email sudah terdaftar" });
    }
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findByUsernameOrEmail(identifier);
    if (!user)
      return res.status(401).json({ message: "Username atau Email salah" });

    if (!user.password) {
      console.error(`User ${user.email} tidak memiliki password di database`);
      return res.status(500).json({ message: "Internal server error" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, identifier: user.identifier, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      status: true,
      message: "Login success",
      data: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        access_token: token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserAll = async (_req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.status(200).json(userData);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, email, phone, alamat } = req.body;
  try {
    const dataToUpdate = {
      name,
      username,
      email,
      phone,
      alamat,
    };

    if (req.file) {
      dataToUpdate.image_url = `uploads/photos/${req.file.filename}`;
    }

    const updatedUser = await User.update(id, dataToUpdate);

    if (!updatedUser) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({
      message: "User berhasil diperbarui",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.code && error.code.startsWith("P")) {
      return res.status(400).json({
        message: "Kesalahan database saat memperbarui user",
      });
    }
    res.status(500).json({
      message: "Gagal memperbarui user",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const delteuser = await User.delete(id);

    if (!delteuser) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (user.image_url) {
      const filePath = path.join(__dirname, "..", user.image_url);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("File foto user berhasil dihapus:", filePath);
      } else {
        console.log("File foto user tidak ditemukan:", filePath);
      }
    }

    res.status(200).json({ message: "User berhasil dihapus" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
