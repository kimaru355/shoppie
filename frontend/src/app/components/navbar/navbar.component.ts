import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../interfaces/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartQuantity: number = 0;
  bg_color = {};
  cartItems!: Cart[];

  ngOnInit() {
    this.getCartItems();
  }


  constructor(private cartService : CartService) {
    this.bg_color = {
      backgroundColor: this.cartQuantity === 0? 'transparent' : 'rgb(172, 6, 6)'
    }
  }
  getCartItems() {
    this.cartService.getCart().subscribe(res => {
      console.log(res.data);
     
      this.cartItems = (res.data) as Cart[];
      this.cartQuantity = this.cartItems.length
      console.log("Log length: ", this.cartItems.length)

     
    })
  }

  
}
