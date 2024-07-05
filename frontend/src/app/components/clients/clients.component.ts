import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { UsersService } from './../../services/users.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  selectedClient: User | null = null;
  clients: User[] = [];
  selectedUser: User | null = null;
  loading: boolean = true;

  constructor(
    private usersService: UsersService,
    private userService: UserService
  ) {
    this.userService.getUserDetails().subscribe((res) => {
      if (res.data) {
        console.log('User details:', res.data);
      } else {
        console.log('No user details received');
      }
    });
  }

  ngOnInit() {
    this.loadClients();
    setTimeout(() => {
      this.loading = false; // Hide the overlay after 1.5 seconds
    }, 1500);
  }

  loadClients() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        console.log('Full response:', response); // Log the entire response
        if (response && response.data) {
          this.clients = response.data;
          console.log('Clients:', this.clients);
        } else {
          console.log('No data received');
        }
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      },
    });
  }

  viewUserDetails(userId: string) {
    this.usersService.getUser(userId).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.selectedUser = response.data;
          this.showUserDetailsModal();
        } else {
          console.log('No user data received');
        }
      },
      error: (error) => console.error('Error fetching user details:', error),
    });
  }
  closeUserDetailsModal() {
    this.selectedUser = null;
  }

  showUserDetailsModal() {
    console.log('Showing user details modal for:', this.selectedUser);
  }
  showPopup(client: User) {
    this.selectedClient = client;
  }
}
