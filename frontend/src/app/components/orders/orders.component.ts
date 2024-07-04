import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';

interface OrderT {
  clientProfile: string;
  name: string;
  product: string;
  date: string;
  status: 'delivered' | 'pending';
  quantity: number;
  amountPaid: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  loading: boolean = true;
  selectedOrder: OrderT | null = null;
  orders: OrderT[] = [
    // {
    //   clientProfile: 'https://example.com/client1.jpg',
    //   name: 'John Doe',
    //   product: 'Floral Tshirt',
    //   date: '2023-05-01',
    //   status: 'delivered',
    //   quantity: 2,
    //   amountPaid: 2400
    // },
    // {
    //   clientProfile: 'https://example.com/client2.jpg',
    //   name: 'Jane Smith',
    //   product: 'Striped Shirt',
    //   date: '2023-05-03',
    //   status: 'pending',
    //   quantity: 1,
    //   amountPaid: 1800
    // },
  ];
  allOrders: Order[] = [];
  constructor(private orderService: OrderService) {
    this.getOrders();
  }
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  showPopup(order: OrderT) {
    this.selectedOrder = order;
  }

  closePopup() {
    this.selectedOrder = null;
  }

  getOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      if (response.success && response.data) {
        this.allOrders = response.data;
        console.log(this.allOrders);
      }
    });
  }
}
