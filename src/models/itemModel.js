import prisma from "../databases/dbConfig.js";

class Item {
  static async create(itemData) {
    return prisma.item.create({
      data: itemData,
    });
  }

  static async findById(id) {
    return await prisma.item.findUnique({
      where: { id: parseInt(id) },
    });
  }

  static async findByCategoryId(category_id) {
    return await prisma.item.findMany({
      where: { category_id: parseInt(category_id) },
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async findAll() {
    return prisma.item.findMany({
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async update(id, itemData) {
    try {
      return await prisma.item.update({
        where: { id: parseInt(id) },
        data: itemData,
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
      return await prisma.item.delete({
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

export default Item;
