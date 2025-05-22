import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService

interface DestinationGuide {
  id: string;
  title: string;
  summary: string;
  photos: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  // private apiUrl = 'https://3000-firebase-travelwebappgit-1746617609073.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api/v1/favorites';
  private apiUrl = 'https://travel-trove-backend-jfmn.onrender.com/api/v1/favorites';
  private favoritesSubject = new BehaviorSubject<DestinationGuide[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getFavorites(): void {
    if (this.authService.isAuthenticated()) {
      this.http
        .get<DestinationGuide[]>(this.apiUrl, { headers: this.getAuthHeaders() })
        .subscribe((data) => this.favoritesSubject.next(data));
    }
  }

  getFavorites1(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  addFavorite(card: DestinationGuide): void {
    if (this.authService.isAuthenticated()) {
      this.http
        .post(this.apiUrl, card, { headers: this.getAuthHeaders() })
        .subscribe(() => this.getFavorites());
    } else {
      alert('You must be logged in to add favorites.');
    }
  }

  removeFavorite(card: DestinationGuide): void {
    console.log('Attempting to remove favorite with ID:', card.id); // Debug log
    this.http.delete(`${this.apiUrl}/${card.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).subscribe(
      (response) => {
        console.log('Favorite removed successfully:', response);
        this.getFavorites(); // Refresh the favorites list
      },
      (error) => {
        console.error('Error removing favorite:', error);
        alert(`Failed to remove favorite: ${error.error?.error || error.message}`);
      }
    );
  }
  
}
