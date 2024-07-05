import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoadingComponent } from '../loading/loading.component';
import { OrderService } from '../../services/order.service';
import { Orders } from '../../interfaces/order';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, NavbarComponent, LoadingComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent implements OnInit {
  loading: boolean = true;
  orders: Orders[] = [];
  ngOnInit() {
    setTimeout(() => {
      this.loading = false; // Hide the overlay after 1.5 seconds
    }, 1500);
  }

  constructor(private orderService: OrderService) {
    this.orderService.getUserOrders().subscribe((response) => {
      if (response.success && response.data) {
        this.orders = response.data;
      }
    });
  }
}
