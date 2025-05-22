import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'https://3000-firebase-travelwebappgit-1746617609073.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api/v1/auth';
  private apiUrl = 'https://travel-trove-backend-jfmn.onrender.com/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    console.log("authService")
    console.log(username, email, password, confirmPassword);
    return this.http.post(`${this.apiUrl}/register`, { username, email, password, confirmPassword });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  getFavorites(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/favorites`, { headers });
  }

  getUserData(): Observable<any> {
    const token = this.getToken();
    if(!token) return new Observable (observer => observer.error('No token found'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return this.http.get(`${this.apiUrl}/user`, {headers});
    return this.http.get('https://travel-trove-backend-jfmn.onrender.com/api/v1/users', {headers});
  }
}
