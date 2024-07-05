// Remove the import statement for OrderService
import { Injectable } from '@angular/core';
import { OrderServices } from '../interfaces/order_service';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';
import { Order, Orders } from '../interfaces/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OrderServices {
  api: string = 'http://localhost:3000/orders';
  token: string = localStorage.getItem('authToken') || '';
  headers = new HttpHeaders({
    authorization: this.token,
  });
  constructor(private http: HttpClient) {}

  createOrder(): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create/${this.token}`, {
      headers: this.headers,
    });
  }

  updateOrder(order: Order): Observable<Res<null>> {
    return this.http.put<Res<null>>(`${this.api}/update`, order, {
      headers: this.headers,
    });
  }

  getAllOrders(): Observable<Res<Order[] | null>> {
    return this.http.get<Res<Order[] | null>>(`${this.api}/all`, {
      headers: this.headers,
    });
  }

  getCompletedOrders(): Observable<Res<Order[] | null>> {
    return this.http.get<Res<Order[] | null>>(`${this.api}/complete`, {
      headers: this.headers,
    });
  }

  getIncompleteOrders(): Observable<Res<Order[] | null>> {
    return this.http.get<Res<Order[] | null>>(`${this.api}/incomplete`, {
      headers: this.headers,
    });
  }

  getOrdersByProductId(productId: string): Observable<Res<Order[] | null>> {
    return this.http.get<Res<Order[] | null>>(
      `${this.api}/product/${productId}`,
      {
        headers: this.headers,
      }
    );
  }

  getUserOrders(): Observable<Res<Orders[] | null>> {
    return this.http.get<Res<Orders[] | null>>(`${this.api}/user`, {
      headers: this.headers,
    });
  }

  getOrdersByUserId(userId: string): Observable<Res<Order[] | null>> {
    return this.http.get<Res<Order[] | null>>(`${this.api}/user/${userId}`, {
      headers: this.headers,
    });
  }
}
