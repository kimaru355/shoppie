import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, LoadingComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  quantity = 1;
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
}
