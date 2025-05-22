import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FavoriteService } from '../favorite.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  errorMessage: string = '';
  favorites: any[] = [];
  isLoginModalOpen: boolean = false;
  isRegisterModalOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private favoriteService: FavoriteService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loadFavorites();
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  openLoginModal() {
    this.isLoginModalOpen = true;
    this.isRegisterModalOpen = false;
    this.clearForms();
  }

  openRegisterModal() {
    this.isRegisterModalOpen = true;
    this.isLoginModalOpen = false;
    this.clearForms();
  }

  closeModals() {
    this.isLoginModalOpen = false;
    this.isRegisterModalOpen = false;
    this.clearForms();
  }

  switchToRegister() {
    this.openRegisterModal();
  }

  switchToLogin() {
    this.openLoginModal();
  }

  loginUser() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.loadFavorites();
        this.closeModals();
        //this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        console.error('Login error:', error);
      }
    );
  }

  registerUser() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.register(this.username, this.email, this.password, this.confirmPassword).subscribe(
      () => {
        this.errorMessage = '';
        this.closeModals();
        this.openLoginModal();
      },
      (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.favorites = [];
    this.router.navigate(['/']);
  }

  loadFavorites() {
    if (this.isLoggedIn()) {
      this.favoriteService.getFavorites1().subscribe(
        (response) => {
          this.favorites = response.favorites || [];
        },
        (error) => {
          console.error('Error loading favorites:', error);
        }
      );
    }
  }

  onSearchChange(): void {
    this.sharedService.setSearchQuery(this.searchQuery);
  }

  private clearForms() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.username = '';
    this.errorMessage = '';
  }
}