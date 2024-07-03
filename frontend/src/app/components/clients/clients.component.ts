import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Client {
  profileUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  numberOfOrders: number;
  registrationDate: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  selectedClient: Client | null = null;
  clients: Client[] = [
    {
      profileUrl: 'https://example.com/client1.jpg',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      numberOfOrders: 5,
      registrationDate: '2022-01-01'
    },
    {
      profileUrl: 'https://example.com/client2.jpg',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '098-765-4321',
      numberOfOrders: 3,
      registrationDate: '2022-05-15'
    },
  ];

  showPopup(client: Client) {
    this.selectedClient = client;
  }

  closePopup() {
    this.selectedClient = null;
  }
}
