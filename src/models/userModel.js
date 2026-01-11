import prisma from "../databases/dbConfig.js";

class User {
  static async create(userData) {
    return prisma.user.create({
      data: userData,
    });
  }
  static async findByUsernameOrEmail(identifier) {
    return prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });
  }

  static async findById(id) {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        alamat: true,
        image_url: true,
        role: true,
      },
    });
  }

  static async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        alamat: true,
        image_url: true,
        role: true,
      },
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async update(id, userData) {
    try {
      return await prisma.user.update({
        where: { id: parseInt(id) },
        data: userData,
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
      return await prisma.user.delete({
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

export default User;
