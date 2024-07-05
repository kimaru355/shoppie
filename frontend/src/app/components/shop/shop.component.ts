import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    RouterLink,
    LoadingComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  loading: boolean = true;
  minPrice: number = 0;
  maxPrice: number = 0;
  maximumPrice: number = 0;
  progressWidth: string = '0%';
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {
    this.updateProgressWidth();
    this.getAllProducts();
  }
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
  updatePriceRange(): void {
    if (this.minPrice > this.maxPrice) {
      let temp = this.maxPrice;
      this.maxPrice = this.minPrice;
      this.minPrice = temp;
    }
    this.updateProgressWidth();
  }
  private updateProgressWidth(): void {
    let totalRange = 10000;
    let selectedRange = this.maxPrice - this.minPrice;
    let progressPercentage = (selectedRange / totalRange) * 100;
    this.progressWidth = `${progressPercentage}%`;
  }

  viewProduct(id: string): void {
    this.router.navigate(['/product', id]);
    localStorage.setItem('productId', id);
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      if (response.success && response.data) {
        this.products = response.data;
        this.setPriceRange();
      }
    });
  }

  getProductByType(productName: string) {
    this.productService.getProductsByName(productName).subscribe((res) => {
      if (res.success && res.data) {
        this.products = [];
        this.products = res.data as Product[];
        this.setPriceRange();
      }
    });
  }

  getProductBySize(productSize: string) {
    this.productService.getProductsByName(productSize).subscribe((res) => {
      if (res.success && res.data) {
        this.products = [];
        this.products = res.data as Product[];
        this.setPriceRange();
      }
    });
  }

  getProductByPrice() {
    this.productService
      .getProductsByPrice(this.minPrice, this.maxPrice)
      .subscribe((res) => {
        if (res.success && res.data) {
          this.products = [];
          this.products = res.data as Product[];
          this.setPriceRange();
        }
      });
  }

  setPriceRange() {
    this.maximumPrice = Math.max(...this.products.map((p) => p.price));
    this.maxPrice = this.maximumPrice;
  }

  resetFilter() {
    this.getAllProducts();
  }
}
