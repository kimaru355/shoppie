import { PrismaClient } from "@prisma/client";
import { OrderServices } from "../interfaces/order_service";
import { Order } from "../interfaces/order";
import { Res } from "../interfaces/res";
import { Product } from "../interfaces/product";

export class OrderService implements OrderServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createOrder(order: Order): Promise<Res<null>> {
    try {
      const product: Product | null = await this.prisma.product.findUnique({
        where: {
          id: order.productId,
          isDeleted: false,
        },
      });
      if (!product) {
        return {
          success: false,
          message: "Product does not exist",
          data: null,
        };
      }
      await this.prisma.order.create({
        data: order,
      });
      return {
        success: true,
        message: "Order successfully created",
        data: null,
      };
    } catch (error: any) {
      if (error.message.includes("Foreign key constraint failed")) {
        return {
          success: false,
          message: "Invalid Product or User Id",
          data: null,
        };
      }

      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getAllOrders(): Promise<Res<Order[] | null>> {
    try {
      const orders = await this.prisma.order.findMany();
      return {
        success: true,
        message: "Orders successfully retrieved",
        data: orders,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getCompletedOrders(): Promise<Res<Order[] | null>> {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          isOrderCompleted: true,
        },
      });
      return {
        success: true,
        message: "Completed orders successfully retrieved",
        data: orders,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getIncompleteOrders(): Promise<Res<Order[] | null>> {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          isOrderCompleted: false,
        },
      });
      return {
        success: true,
        message: "Incomplete orders successfully retrieved",
        data: orders,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getOrdersByProductId(productId: string): Promise<Res<Order[] | null>> {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          productId: productId,
        },
      });
      return {
        success: true,
        message: "Orders successfully retrieved",
        data: orders,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getOrdersByUserId(userId: string): Promise<Res<Order[] | null>> {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          userId: userId,
        },
      });
      return {
        success: true,
        message: "Orders successfully retrieved",
        data: orders,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }
}
