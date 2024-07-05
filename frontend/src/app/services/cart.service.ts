import { Injectable } from '@angular/core';
import { CartServices } from '../interfaces/cart_service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../interfaces/cart';
import { Res } from '../interfaces/res';

@Injectable({
  providedIn: 'root',
})
export class CartService implements CartServices {
  api: string = 'http://localhost:3000/cart';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('authToken') || '',
  });
  constructor(private http: HttpClient) {}

  addToCart(item: CartItem): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/add`, item, {
      headers: this.headers,
    });
  }

  getCart(): Observable<Res<Cart[] | null>> {
    return this.http.get<Res<Cart[] | null>>(`${this.api}/all`, {
      headers: this.headers,
    });
  }

  deleteFromCart(id: string): Observable<Res<null>> {
    return this.http.delete<Res<null>>(`${this.api}/delete/${id}`, {
      headers: this.headers,
    });
  }

  emptyCart(): Observable<Res<null>> {
    return this.http.delete<Res<null>>(`${this.api}/delete/all`, {
      headers: this.headers,
    });
  }

  incrementCartItem(id: string): Observable<Res<null>> {
    return this.http.put<Res<null>>(`${this.api}/increment/${id}`, {
      headers: this.headers,
    });
  }

  decrementCartItem(id: string): Observable<Res<null>> {
    return this.http.put<Res<null>>(`${this.api}/decrement/${id}`, {
      headers: this.headers,
    });
  }
}
