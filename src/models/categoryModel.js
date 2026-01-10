import prisma from "../databases/dbConfig.js";

class Category {
  static async create(categoryData) {
    return prisma.category.create({
      data: categoryData,
    });
  }

  static async findById(id) {
    return await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
  }

  static async findAll() {
    return prisma.category.findMany({
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async update(id, categoryData) {
    try {
      return await prisma.category.update({
        where: { id: parseInt(id) },
        data: categoryData,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  }
  static async delete(id) {
    try {
      return await prisma.category.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  }
}

export default Category;
