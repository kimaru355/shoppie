import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Cart, CartItem } from '../../interfaces/cart';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  quantity = 1;
  cartItems!: Cart[];
  subtotal: number = 0;
  discount: number = 0;
  deliveryFee: number = 0;
  total: number = 0;

  changeQuantity(change: number): void {
    this.quantity += change;
    this.quantity = Math.max(1, this.quantity);
  }

  constructor(private cartService: CartService) {
    this.getCartItems();
  }

  getDiscountAndDeliveryFee() {
    this.discount = this.subtotal * 0.02;
    this.deliveryFee = this.subtotal * 0.01;
    this.total = this.subtotal - this.discount + this.deliveryFee;
  }

  getCartItems() {
    this.cartService.getCart().subscribe(res => {
      console.log(res.data);
      console.log("Log length: ");
      
      this.cartItems = (res.data) as Cart[];
      localStorage.setItem('cart_tally', `${this.cartItems.length}`);

      for (let item of this.cartItems) {
        console.log(`here iam: ${typeof (item.product.price * item.productNumber)}`);
        
        this.subtotal += (item.product.price * item.productNumber);
      }
      this.getDiscountAndDeliveryFee();
    })
  }

  deleteCartItem(id: string) {
    this.cartService.deleteFromCart(id).subscribe(res => {
      console.log(res);
      this.cartItems = [];
      this.getCartItems();
    })
  }
}
