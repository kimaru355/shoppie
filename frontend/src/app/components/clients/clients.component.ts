
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { UsersService } from './../../services/users.service';// Adjust the import path as necessary
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  selectedClient: User | null = null;
  clients: User[] = [];
  selectedUser: User | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        // Assuming 'response' is of type Res<User[] | null>
        if (response && response.data) {
          this.clients = response.data;
          console.log('Clients:', this.clients);
        } else {
          console.log('No data received');
        }
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }

  viewUserDetails(userId: string) {
    this.usersService.getUser(userId).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.selectedUser = response.data;
          // Assuming you have a method to show details (e.g., open a modal)
          this.showUserDetailsModal();
        } else {
          console.log('No user data received');
        }
      },
      error: (error) => console.error('Error fetching user details:', error)
    });
  }

  showUserDetailsModal() {
    // Implement the logic to display the modal here
    // This could involve setting a boolean flag to show a modal in the template
    // Or if using a library, calling a method to open the modal
    console.log('Showing user details modal for:', this.selectedUser);
  }
  closeUserDetailsModal() {
    this.selectedUser = null; // This will hide the modal by making the *ngIf condition false
  }

  showPopup(client: User) {
    this.selectedClient = client;
  }
}
