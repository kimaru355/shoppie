import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../interfaces/cart';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent, CommonModule, LoadingComponent, MessageComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  cartItems!: Cart[];
  loading: boolean = true;
  product: Product | null = null;
  quantity = 1;
  cartItem: string = localStorage.getItem('productId') as string;
  message: string | null = null;
  messageType: 'success' | 'error' | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe((response) => {
        if (response.success && response.data) {
          this.product = response.data;
        }
      });
    }
    setTimeout(() => {
      this.loading = false;
    }, 1500);
    this.getCartItems();
  }

  changeQuantity(change: number): void {
    this.quantity += change;
    this.quantity = Math.max(1, this.quantity);
  }

  addToCart(productId: string) {
    this.getCartItems();
    this.cartService
      .addToCart({ productId: productId, productNumber: this.quantity })
      .subscribe((res) => {
        if (!res.success) {
          this.showMessage(res.message, 'error');
          return;
        }
        this.showMessage(res.message, 'success');
      });
  }
  getCartItems() {
    this.cartService.getCart().subscribe((res) => {
      this.cartItems = res.data as Cart[];
      localStorage.setItem('cart_tally', `${this.cartItems.length}`);
    });
  }
  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.clearMessage();
    }, 2000);
  }
  clearMessage(): void {
    this.message = null;
    this.messageType = undefined;
  }
}
