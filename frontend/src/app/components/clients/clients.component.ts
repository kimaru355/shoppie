import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  // selectedClient: User | null = null;
  // clients: User[] = [];

  // constructor(private userService : UsersService) {}

  ngOnInit() {
    // this.loadClients();
  }

  // loadClients() {
    // this.userService.getUsers().subscribe({
  //     next: (response) => {
  //       // Assuming response.data contains the User[] array
  //       this.clients = response.data || []; // Fallback to an empty array if null
  //     },
  //     error: (error) => {
  //       console.error('Error fetching clients:', error);
  //     }
  //   });
  // }

  // showPopup(client: User) {
  //   this.selectedClient = client;
  // }
}
