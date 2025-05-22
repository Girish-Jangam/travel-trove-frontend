import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AdminAuthService} from '../admin-auth.service'  // Make sure AuthService is properly imported

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AdminAuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        
        this.authService.setCurrentUser(response.token);
        this.router.navigate(['/admin-dashboard']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
}

