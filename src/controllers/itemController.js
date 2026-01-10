import Item from "../models/itemModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createItem = async (req, res) => {
  const {
    category_id,
    item_code,
    item_name,
    description,
    rental_price,
    stock,
    status,
  } = req.body;
  const image_url =
    req.files?.map((file) => `uploads/items/${file.filename}`) || [];
  try {
    const itemData = await Item.create({
      category_id: parseInt(category_id),
      item_code,
      item_name,
      description,
      rental_price: parseInt(rental_price),
      stock: parseInt(stock),
      status,
      image_url,
    });
    res.status(201).json({
      status: true,
      message: "Item added successfully",
      itemData,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Kode barang sudah ada" });
    }
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getItemAll = async (_req, res) => {
  try {
    const itemData = await Item.findAll();
    res.status(200).json(itemData);
  } catch (err) {
    console.error("Error getting item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const itemData = await Item.findById(id);
    if (!itemData) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }
    res.status(200).json(itemData);
  } catch (err) {
    console.error("Error getting item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getItemByCategoryId = async (req, res) => {
  const { category_id } = req.params;
  try {
    const itemData = await Item.findByCategoryId(category_id);
    if (itemData.length === 0) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }
    res.status(200).json(itemData);
  } catch (err) {
    console.error("Error getting item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const {
    category_id,
    item_code,
    item_name,
    description,
    rental_price,
    stock,
    status,
  } = req.body;
  try {
    const dataToUpdate = {
      category_id: parseInt(category_id),
      item_code,
      item_name,
      description,
      rental_price: parseInt(rental_price),
      stock: parseInt(stock),
      status,
    };

    if (req.files?.length) {
      dataToUpdate.image_url = req.files.map(
        (file) => `uploads/items/${file.filename}`
      );
    }

    const updatedItem = await Item.update(id, dataToUpdate);

    if (!updatedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.status(200).json({
      message: "Item berhasil diperbarui",
      data: dataToUpdate,
    });
  } catch (error) {
    console.error("Error updating Item:", error);

    if (error.code && error.code.startsWith("P")) {
      return res.status(400).json({
        message: "Kesalahan database saat memperbarui item",
      });
    }
    res.status(500).json({
      message: "Gagal memperbarui item",
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    const deletedItem = await Item.delete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    if (item.image_url) {
      if (Array.isArray(item.image_url)) {
        item.image_url.forEach((img) => {
          const filePath = path.join(__dirname, "..", img);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });
      } else {
        const filePath = path.join(__dirname, "..", item.image_url);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({ message: "Item berhasil dihapus" });
  } catch (err) {
    console.error("Error deleting Item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
