import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Cart, CartItem } from '../../interfaces/cart';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NavbarComponent,
    LoadingComponent,
    CommonModule,
    CommonModule,
    MessageComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  quantity = 1;
  cartItems!: Cart[];
  subtotal: number = 0;
  discount: number = 0;
  deliveryFee: number = 0;
  total: number = 0;
  loading: boolean = true;
  message: string | null = null;
  messageType: 'success' | 'error' | undefined;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false; // Hide the overlay after 1.5 seconds
    }, 1500);
  }

  changeQuantity(change: number): void {
    this.quantity += change;
    this.quantity = Math.max(1, this.quantity);
  }

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {
    this.getCartItems();
  }

  getDiscountAndDeliveryFee() {
    this.discount = this.subtotal * 0.02;
    this.deliveryFee = this.subtotal * 0.01;
    this.total = this.subtotal - this.discount + this.deliveryFee;
  }

  getCartItems() {
    this.cartService.getCart().subscribe((res) => {
      if (!res.success) {
        this.cartItems = [];
        return;
      }
      this.cartItems = res.data as Cart[];
      localStorage.setItem('cart_count', `${this.cartItems.length}`);

      for (let item of this.cartItems) {
        this.subtotal += item.product.price * item.productNumber;
      }
      this.getDiscountAndDeliveryFee();
    });
  }

  deleteCartItem(id: string) {
    this.cartService.deleteFromCart(id).subscribe((res) => {
      if (!res.success) {
        this.showMessage(res.message, 'error');
        return;
      }
      this.showMessage(res.message, 'success');
      this.cartItems = [];
      this.getCartItems();
    });
  }

  setOrder() {
    this.orderService.createOrder().subscribe((res) => {
      if (!res.success) {
        this.showMessage(res.message, 'error');
        return;
      }
      this.showMessage(res.message, 'success');
      this.getCartItems();
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
