import { Injectable } from '@angular/core';
import { OrderServices } from '../interfaces/order_service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OrderServices {
  api: string = 'http://localhost:3000/orders';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('authToken') || '',
  });
  constructor(private http: HttpClient) {}

  createOrder(userId: string): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create`, userId, {
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

  getOrdersByUserId(userId: string): Observable<Res<Order[] | null>> {
    return this.http.get<Res<Order[] | null>>(`${this.api}/user/${userId}`, {
      headers: this.headers,
    });
  }
}
