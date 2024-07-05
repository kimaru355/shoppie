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
      } else {
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
        if (response && response.data) {
          this.clients = response.data;
        } else {
        }
      },
      error: (error) => {},
    });
  }

  viewUserDetails(userId: string) {
    this.usersService.getUser(userId).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.selectedUser = response.data;
          this.showUserDetailsModal();
        } else {
        }
      },
      error: (error) => console.error('Error fetching user details:', error),
    });
  }
  closeUserDetailsModal() {
    this.selectedUser = null;
  }

  showUserDetailsModal() {}
  showPopup(client: User) {
    this.selectedClient = client;
  }
}
