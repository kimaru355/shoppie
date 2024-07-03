import { PrismaClient } from "@prisma/client";
import { Analytic } from "../interfaces/analytic";
import { AnalyticServices } from "../interfaces/analytic_service";

export class AnalyticService implements AnalyticServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async getAnalytics(): Promise<Analytic> {
    const totalUsers = await this.prisma.user.count();
    const totalOrders = await this.prisma.order.count();
    const totalCompleteOrders = await this.prisma.order.count({
      where: {
        isOrderCompleted: true,
      },
    });
    const totalIncompleteOrders = await this.prisma.order.count({
      where: {
        isOrderCompleted: false,
      },
    });
    const totalProducts = await this.prisma.product.count();
    const totalProductsSold = await this.prisma.order.aggregate({
      _sum: {
        productNumber: true,
      },
    });
    const totalRevenue = await this.prisma.order.aggregate({
      _sum: {
        productNumber: true,
      },
    });
    return new Promise((resolve, reject) => {
      resolve({
        totalUsers: 0,
        totalOrders: 0,
        totalCompleteOrders: 0,
        totalIncompleteOrders: 0,
        totalProducts: 0,
        totalProductsSold: 0,
        totalRevenue: 0,
        topTenSellingProducts: [],
        tenLeastStockProducts: [],
        totalCategories: 0,
      });
    });
  }
}
