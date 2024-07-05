import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../loading/loading.component';
import { Router, RouterLink } from '@angular/router'; // Import Router
import { MessageComponent } from '../message/message.component';
import { underline } from '@cloudinary/url-gen/qualifiers/textDecoration';

interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    role: 'user' | 'admin';
    token: string;
  };
}

interface Res<T> {
  success: boolean;
  message: string;
  data?: T;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent, LoadingComponent, RouterLink, MessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  message: string | null = null;
  messageType: 'success' | 'error' | undefined;
  loading: boolean = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const userLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(userLogin).subscribe((response: Res<{ role: 'user' | 'admin'; token: string; } | null>) => {
      if (response.success && response.data?.token) {
        localStorage.setItem('authToken', response.data.token);
        this.showMessage('Login successful', 'success');
        const role = response.data.role;
      setTimeout(() => {

        if (role === 'user') {
          this.router.navigate(['/cart']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin']);
        }
      }, 2100);

      } else {
        this.showMessage('Login failed: ' + response.message, 'error');
      }
    }, (err) => {
      console.error('Error logging in:', err);
      this.showMessage('Error logging in. Please try again later.', 'error');
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
