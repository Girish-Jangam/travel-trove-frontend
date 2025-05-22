import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface Admin {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  // private apiUrl = 'http://localhost:3000/api/v1/admin';  // Adjust API URL
     private apiUrl = 'https://travel-trove-backend-jfmn.onrender.com/api/v1/admin';  // Adjust API URL

  private currentUserSubject: BehaviorSubject<Admin | null>;
  public currentUser: Observable<Admin | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedAdmin = localStorage.getItem('admin');
    this.currentUserSubject = new BehaviorSubject<Admin | null>(
      storedAdmin ? JSON.parse(storedAdmin) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<Admin> {
    const admin = localStorage.getItem('admin');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }, {headers}).pipe(
      map(response => {
        const adminData: Admin = { email, token: response.token };
        this.setCurrentUser(adminData);
        return adminData;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }

  setCurrentUser(admin: Admin) {
    localStorage.setItem('admin', JSON.stringify(admin));
    this.currentUserSubject.next(admin);
  }

  logout() {
    localStorage.removeItem('admin');
    this.currentUserSubject.next(null);
    this.router.navigate(['/admin-login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('admin');
  }

  getAdminToken(): string | null {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin).token : null;
  }
}
