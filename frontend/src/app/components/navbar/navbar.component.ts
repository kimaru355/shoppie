import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../interfaces/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cartQuantity: string = '0';
  bg_color = {};
  cartItems!: Cart[];
  isLoggedIn: boolean = localStorage.getItem('authToken') ? true : false;

  constructor(private cartService: CartService, private router: Router) {
    this.cartQuantity = localStorage.getItem('cart_count') as string;
    this.bg_color = {
      backgroundColor:
        this.cartQuantity === '0' ? 'transparent' : 'rgb(172, 6, 6)',
    };
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('cart_tally');
    localStorage.removeItem('productId');
    localStorage.removeItem('cart_count');
    this.isLoggedIn = false;
    window.location.href = '/';
  }
}
