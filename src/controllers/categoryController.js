import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const categoryData = await Category.create({
      category_name,
    });
    res.status(201).json({
      status: true,
      message: "Create category name success",
      categoryData,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Nama kategori sudah ada" });
    }
    console.error("Error creating category name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategoryAll = async (_req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    console.error("Error getting category name:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryData = await Category.findById(id);
    if (!categoryData) {
      return res.status(404).json({ message: "Category name tidak ditemukan" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.error("Error getting category name:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;
  try {
    const dataToUpdate = {
      category_name,
    };

    const updatedCategory = await Category.update(id, dataToUpdate);

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category name tidak ditemukan" });
    }

    res.status(200).json({
      message: "Category name berhasil diperbarui",
      data: dataToUpdate,
    });
  } catch (error) {
    console.error("Error updating category name:", error);

    if (error.code && error.code.startsWith("P")) {
      return res.status(400).json({
        message: "Kesalahan database saat memperbarui category name",
      });
    }
    res.status(500).json({
      message: "Gagal memperbarui category name",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.delete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category name tidak ditemukan" });
    }

    res.status(200).json({ message: "Category name berhasil dihapus" });
  } catch (err) {
    console.error("Error deleting category name:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
