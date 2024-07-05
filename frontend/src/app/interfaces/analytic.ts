import { Product } from './product';

export interface Analytic {
  totalUsers: number;
  totalOrders: number;
  totalCompleteOrders: number;
  totalIncompleteOrders: number;
  totalProducts: number;
  totalProductsSold: number;
  totalRevenue: number;
  topTenSellingProducts: Product[];
  tenLeastStockProducts: Product[];
  totalCategories: number;
}
