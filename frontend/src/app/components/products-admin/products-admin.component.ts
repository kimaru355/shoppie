import { FormComponent } from './../form/form.component';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit, OnDestroy {
  progressPercentage: number = 20;
  products: Product[] = [];
  productsSubscription: Subscription | undefined;

  @Output() editProductEvent = new EventEmitter<Product>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  loadProducts() {
    this.productsSubscription = this.productService.getAllProducts().subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.data || [];
        } else {
          console.error('Failed to load products:', res.message);
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  handleEditClick(product: Product) {
    this.editProductEvent.emit(product);
  }
}
