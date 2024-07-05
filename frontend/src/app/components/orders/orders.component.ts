// src/app/components/orders/orders.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { MessageComponent } from '../message/message.component';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  type: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  country: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, LoadingComponent, MessageComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  message: string | null = null;
  messageType: 'success' | 'error' | undefined;
  loading: boolean = true;
  selectedOrder: (Order & { product: Product; user: User }) | null = null;
  orders: (Order & { product: Product; user: User })[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrders();
  }

  showPopup(order: Order & { product: Product; user: User }) {
    this.selectedOrder = order;
  }

  closePopup() {
    this.selectedOrder = null;
  }

  updateOrder() {
    if (this.selectedOrder) {
      const orderToUpdate: Order = {
        id: this.selectedOrder.id,
        productId: this.selectedOrder.productId,
        userId: this.selectedOrder.userId,
        productNumber: this.selectedOrder.productNumber,
        isOrderCompleted: this.selectedOrder.isOrderCompleted,
        createdAt: this.selectedOrder.createdAt,
        updateAt: this.selectedOrder.updateAt,
      };

      this.orderService.updateOrder(orderToUpdate.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.showMessage('Order updated successfully', 'success');
            this.getOrders();
          } else {
            this.showMessage(response.message || 'Unknown error', 'error');
            console.error('Error updating Order:', response);
          }
        },
        error: (error) => {
          this.showMessage('Failed to update Order', 'error');
          console.error('Error updating Order:', error);
        },
      });
    }
  }

  getOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      if (response.success && response.data) {
        this.orders = response.data.map((order: any) => ({
          ...order,
          product: {
            id: order.product.id,
            name: order.product.name,
            price: order.product.price,
            description: order.product.description,
            type: order.product.type,
          },
          user: {
            id: order.user.id,
            email: order.user.email,
            name: order.user.name,
            phoneNumber: order.user.phoneNumber,
            country: order.user.country,
          },
        }));
        this.loading = false;
      }
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
