import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductServices } from '../interfaces/product_service';
import { Observable } from 'rxjs';
import { NewProduct, Product } from '../interfaces/product';
import { Res } from '../interfaces/res';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements ProductServices {
  api: string = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  createProduct(product: NewProduct): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create`, product);
  }

  createProducts(products: NewProduct[]): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create-many`, products);
  }

  updateProduct(product: Product): Observable<Res<null>> {
    return this.http.put<Res<null>>(`${this.api}/update`, product);
  }

  deleteProduct(id: string): Observable<Res<null>> {
    return this.http.delete<Res<null>>(`${this.api}/delete/${id}`);
  }

  getProduct(productId: string): Observable<Res<Product | null>> {
    return this.http.get<Res<Product | null>>(`${this.api}/${productId}`);
  }

  getAllProducts(): Observable<Res<Product[] | null>> {
    return this.http.get<Res<Product[] | null>>(`${this.api}/all`);
  }

  getProductsByName(productName: string): Observable<Res<Product[] | null>> {
    return this.http.get<Res<Product[] | null>>(
      `${this.api}/name/${productName}`
    );
  }

  getProductsByType(productType: string): Observable<Res<Product[] | null>> {
    return this.http.get<Res<Product[] | null>>(
      `${this.api}/type/${productType}`
    );
  }
}