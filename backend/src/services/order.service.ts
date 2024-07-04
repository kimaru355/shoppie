import { PrismaClient } from "@prisma/client";
import { OrderServices } from "../interfaces/order_service";
import { Order } from "../interfaces/order";
import { Res } from "../interfaces/res";
import { v4 } from "uuid";

export class OrderService implements OrderServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createOrder(userId: string): Promise<Res<null>> {
    try {
      const cart: Order[] = await this.prisma.cart.findMany({
        where: {
          userId: userId,
        },
      });
      if (cart.length === 0) {
        return {
          success: false,
          message: "Cart is empty",
          data: null,
        };
      }
      cart.forEach((item) => {
        item.id = v4();
      });
      const products = await this.prisma.product.findMany({
        where: {
          id: {
            in: cart.map((item) => item.productId),
          },
        },
      });
      let isQuantityExceeded: boolean = false;
      for (let i = 0; i < cart.length; i++) {
        const product = products.find(
          (product) => product.id === cart[i].productId
        );
        if (product && product.quantity < cart[i].productNumber) {
          isQuantityExceeded = true;
        }
      }
      if (isQuantityExceeded) {
        return {
          success: false,
          message: "Quantity exceeds available stock",
          data: null,
        };
      }
      products.map((product) => {
        cart.map(async (item) => {
          if (product.id === item.productId) {
            await this.prisma.product.update({
              where: {
                id: product.id,
              },
              data: {
                quantity: product.quantity - item.productNumber,
              },
            });
          }
        });
      }),
        await this.prisma.$transaction([
          this.prisma.order.createMany({
            data: cart,
          }),
          this.prisma.cart.deleteMany({
            where: {
              userId: userId,
            },
          }),
        ]);
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
