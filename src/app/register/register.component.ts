import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.register(this.username, this.email, this.password, this.confirmPassword).subscribe(
      () => {
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    );
  }
}
