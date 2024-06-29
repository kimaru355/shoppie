import { Order } from "./order";
import { Res } from "./res";

export interface OrderServices {
  createOrder(order: Order): Promise<Res<null>>;
  getAllOrders(): Promise<Res<Order[] | null>>;
  getCompletedOrders(): Promise<Res<Order[] | null>>;
  getIncompleteOrders(): Promise<Res<Order[] | null>>;
  getOrdersByProductId(productId: string): Promise<Res<Order[] | null>>;
  getOrdersByUserId(userId: string): Promise<Res<Order[] | null>>;
}
