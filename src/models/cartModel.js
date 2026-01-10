import prisma from "../databases/dbConfig.js";

class Order {
  static async create(orderData) {
    return prisma.order.create({
      data: orderData,
    });
  }

  static async findCartById(user_id) {
    return await prisma.order.findFirst({
      where: {
        user_id,
        status: "Keranjang",
      },
    });
  }

  static async findPendingById(user_id) {
    return await prisma.order.findFirst({
      where: {
        user_id,
        status: "Tertunda",
      },
    });
  }

  static async findPendingByOrderId(id) {
    return await prisma.order.findFirst({
      where: {
        id: parseInt(id),
        status: "Tertunda",
      },
      include: {
        details: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  static async findRentedByOrderId(id) {
    return await prisma.order.findFirst({
      where: {
        id: parseInt(id),
        status: "Disewa",
      },
      include: {
        details: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  static async findCartByUserId(userId) {
    return prisma.order.findFirst({
      where: {
        user_id: userId,
        status: "Keranjang",
      },
      include: {
        details: true,
      },
    });
  }

  static async findAllCart(user_id) {
    return prisma.order.findMany({
      where: { user_id, status: "Keranjang" },
      select: {
        id: true,
        user_id: true,
        status: true,
        subtotal: true,
        details: {
          select: {
            id: true,
            rental_date: true,
            rental_hour: true,
            return_date: true,
            return_hour: true,
            duration: true,
            quantity: true,
            subtotal: true,
            item: {
              select: {
                id: true,
                item_name: true,
                status: true,
                rental_price: true,
                stock: true,
                image_url: true,
              },
            },
          },
          orderBy: [{ created_at: "desc" }],
        },
      },
    });
  }

  static async findAllPendingCheckoutByUser(user_id) {
    return prisma.order.findMany({
      where: { user_id, status: "Tertunda" },
      select: {
        id: true,
        user_id: true,
        status: true,
        subtotal: true,
        details: {
          select: {
            id: true,
            rental_date: true,
            rental_hour: true,
            return_date: true,
            return_hour: true,
            duration: true,
            quantity: true,
            subtotal: true,
            item: {
              select: {
                id: true,
                item_name: true,
                status: true,
                rental_price: true,
                stock: true,
                image_url: true,
              },
            },
          },
        },
      },
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async findAllRentedCheckoutByUser(user_id) {
    return prisma.order.findMany({
      where: { user_id, status: "Disewa" },
      select: {
        id: true,
        user_id: true,
        status: true,
        subtotal: true,
        details: {
          select: {
            id: true,
            rental_date: true,
            rental_hour: true,
            return_date: true,
            return_hour: true,
            duration: true,
            quantity: true,
            subtotal: true,
            item: {
              select: {
                id: true,
                item_name: true,
                status: true,
                rental_price: true,
                stock: true,
                image_url: true,
              },
            },
          },
        },
      },
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async findAllFinishedCheckoutByUser(user_id) {
    return prisma.order.findMany({
      where: { user_id, status: "Selesai" },
      select: {
        id: true,
        user_id: true,
        status: true,
        subtotal: true,
        details: {
          select: {
            id: true,
            rental_date: true,
            rental_hour: true,
            return_date: true,
            return_hour: true,
            duration: true,
            quantity: true,
            subtotal: true,
            item: {
              select: {
                id: true,
                item_name: true,
                status: true,
                rental_price: true,
                stock: true,
                image_url: true,
              },
            },
          },
        },
      },
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async findAllCanceledCheckoutByUser(user_id) {
    return prisma.order.findMany({
      where: { user_id, status: "Dibatalkan" },
      select: {
        id: true,
        user_id: true,
        status: true,
        subtotal: true,
        details: {
          select: {
            id: true,
            rental_date: true,
            rental_hour: true,
            return_date: true,
            return_hour: true,
            duration: true,
            quantity: true,
            subtotal: true,
            item: {
              select: {
                id: true,
                item_name: true,
                status: true,
                rental_price: true,
                stock: true,
                image_url: true,
              },
            },
          },
        },
      },
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async findAllDataCheckout(user_id) {
    const orders = await prisma.order.findMany({
      where: {
        user_id,
        status: {
          not: "Keranjang",
        },
      },
      select: {
        id: true,
        user_id: true,
        status: true,
        subtotal: true,
        details: {
          select: {
            id: true,
            rental_date: true,
            rental_hour: true,
            return_date: true,
            return_hour: true,
            duration: true,
            quantity: true,
            subtotal: true,
            item: {
              select: {
                id: true,
                item_name: true,
                status: true,
                rental_price: true,
                stock: true,
                image_url: true,
              },
            },
          },
        },
      },
      orderBy: [{ created_at: "desc" }],
    });
    const statusOrder = ["Tertunda", "Disewa", "Selesai", "Dibatalkan"];
    orders.sort((a, b) => {
      const statusDiff =
        statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.created_at) - new Date(a.created_at);
    });

    return orders;
  }

  static async findAllPendingCheckout() {
    return prisma.order.findMany({
      where: { status: "Tertunda" },
      select: {
        id: true,
        user_id: true,
        status: true,
        subtotal: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        details: {
          select: {
            id: true,
            rental_date: true,
            rental_hour: true,
            return_date: true,
            return_hour: true,
            duration: true,
            quantity: true,
            subtotal: true,
            item: {
              select: {
                id: true,
                item_name: true,
                status: true,
                rental_price: true,
                stock: true,
                image_url: true,
              },
            },
          },
        },
      },
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async findAllRentedCheckout() {
    return prisma.order.findMany({
      where: { status: "Disewa" },
      select: {
        id: true,
        user_id: true,
        status: true,
        subtotal: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        details: {
          select: {
            id: true,
            rental_date: true,
            rental_hour: true,
            return_date: true,
            return_hour: true,
            duration: true,
            quantity: true,
            subtotal: true,
            item: {
              select: {
                id: true,
                item_name: true,
                status: true,
                rental_price: true,
                stock: true,
                image_url: true,
              },
            },
          },
        },
      },
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async findAllFinishedCheckout() {
    return prisma.order.findMany({
      where: { status: "Selesai" },
      select: {
        id: true,
        user_id: true,
        status: true,
        subtotal: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        details: {
          select: {
            id: true,
            rental_date: true,
            rental_hour: true,
            return_date: true,
            return_hour: true,
            duration: true,
            quantity: true,
            subtotal: true,
            item: {
              select: {
                id: true,
                item_name: true,
                status: true,
                rental_price: true,
                stock: true,
                image_url: true,
              },
            },
          },
        },
      },
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async findAllCanceledCheckout() {
    return prisma.order.findMany({
      where: { status: "Dibatalkan" },
      select: {
        id: true,
        user_id: true,
        status: true,
        subtotal: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        details: {
          select: {
            id: true,
            rental_date: true,
            rental_hour: true,
            return_date: true,
            return_hour: true,
            duration: true,
            quantity: true,
            subtotal: true,
            item: {
              select: {
                id: true,
                item_name: true,
                status: true,
                rental_price: true,
                stock: true,
                image_url: true,
              },
            },
          },
        },
      },
      orderBy: [{ created_at: "asc" }],
    });
  }

  static async findUserCart(orderId, userId) {
    return prisma.order.findFirst({
      where: {
        id: parseInt(orderId),
        user_id: userId,
        status: "Keranjang",
      },
      include: {
        details: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  static async update(id, orderData) {
    try {
      return await prisma.order.update({
        where: { id: parseInt(id) },
        data: orderData,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  }

  static async updateStatusToRented(id) {
    return prisma.order.update({
      where: { id: parseInt(id) },
      data: { status: "Disewa" },
    });
  }

  static async updateStatusToCanceled(id) {
    return prisma.order.update({
      where: { id: parseInt(id) },
      data: { status: "Dibatalkan" },
    });
  }

  static async updateStatusToFinished(id) {
    return prisma.order.update({
      where: { id: parseInt(id) },
      data: { status: "Selesai" },
    });
  }
}

export default Order;
