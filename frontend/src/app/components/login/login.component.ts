import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../loading/loading.component';
import { Router, RouterLink } from '@angular/router'; // Import Router

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent, LoadingComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
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
        console.log(response);
        localStorage.setItem('authToken', response.data.token);
        this.router.navigate(['/signup']); // Redirect to /signup
      } else {
        console.error('Login failed or token missing:', response.message);
      }
    }, (err) => {
      console.error(err);
      // Handle login error
    });
  }
}
