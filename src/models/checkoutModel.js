import prisma from "../databases/dbConfig.js";

class OrderDetail {
  static async create(orderDetailData) {
    return prisma.orderDetail.create({
      data: orderDetailData,
    });
  }

  static async findById(id) {
    return await prisma.orderDetail.findUnique({
      where: { id: parseInt(id) },
    });
  }

  static async update(id, orderDetailData) {
    try {
      return await prisma.orderDetail.update({
        where: { id: parseInt(id) },
        data: orderDetailData,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  }

  static async moveOrderDetailsToOrder(orderDetailIds, newOrderId) {
    return prisma.orderDetail.updateMany({
      where: {
        id: { in: orderDetailIds },
      },
      data: {
        order_id: newOrderId,
      },
    });
  }

  static async delete(id) {
    try {
      return await prisma.orderDetail.delete({
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

export default OrderDetail;
