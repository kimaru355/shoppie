import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Cart, CartItem } from '../../interfaces/cart';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, LoadingComponent, CommonModule, CommonModule],
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
      console.log(res.data);
      console.log('Log length: ');

      this.cartItems = res.data as Cart[];
      localStorage.setItem('cart_count', `${this.cartItems.length}`);

      for (let item of this.cartItems) {
        console.log(
          `here iam: ${typeof (item.product.price * item.productNumber)}`
        );

        this.subtotal += item.product.price * item.productNumber;
      }
      this.getDiscountAndDeliveryFee();
    });
  }

  deleteCartItem(id: string) {
    this.cartService.deleteFromCart(id).subscribe((res) => {
      console.log(res);
      this.cartItems = [];
      this.getCartItems();
    });
  }

  setOrder() {
    console.log('checkout works');
    this.orderService.createOrder().subscribe((res) => {
      console.log(res.message);
    });
  }
}
