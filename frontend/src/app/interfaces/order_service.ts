import { Observable } from 'rxjs';
import { Order, Orders } from './order';
import { Res } from './res';

export interface OrderServices {
  createOrder(): Observable<Res<null>>;
  updateOrder(order: Order): Observable<Res<null>>;
  getAllOrders(): Observable<Res<Order[] | null>>;
  getCompletedOrders(): Observable<Res<Order[] | null>>;
  getIncompleteOrders(): Observable<Res<Order[] | null>>;
  getOrdersByProductId(productId: string): Observable<Res<Order[] | null>>;
  getUserOrders(): Observable<Res<Orders[] | null>>;
  getOrdersByUserId(userId: string): Observable<Res<Order[] | null>>;
}
