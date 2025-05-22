import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // private baseUrl = 'http://localhost:3000/api/v1/admin'; // URL to your backend data
  private baseUrl = 'https://travel-trove-backend-jfmn.onrender.com/api/v1/admin'; // URL to your backend data

  constructor(private http: HttpClient) {}

  // Get all destination guides
  getDestinationGuides(): Observable<any[]> {
    const admin = localStorage.getItem('admin');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.get<any[]>(`${this.baseUrl}/destinationGuides`, { headers });
  }

  // Get all trip itineraries
  getTripItineraries(): Observable<any[]> {
    const admin = localStorage.getItem('admin');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.get<any[]>(`${this.baseUrl}/tripItineraries`, { headers });
  }

  // Add a new destination guide
  addDestination(destination: any): Observable<any> {
    const admin = localStorage.getItem('admin');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.post(`${this.baseUrl}/destinationGuides`, destination, { headers });
  }

  // Update a destination guide
  updateDestination(destination: any): Observable<any> {
    const admin = localStorage.getItem('admin');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    console.log(destination + " 15");
    console.log(destination.id + "16")
    return this.http.put(`${this.baseUrl}/destinationGuides/${destination.id}`, destination, { headers });
  }

  // Delete a destination guide
  deleteDestination(id: string): Observable<any> {
    const admin = localStorage.getItem('admin');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.delete(`${this.baseUrl}/destinationGuides/${id}`, { headers });
  }

  // Add a new trip itinerary
  addItinerary(itinerary: any): Observable<any> {
    const admin = localStorage.getItem('admin');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.post(`${this.baseUrl}/tripItineraries`, itinerary, { headers });
  }

  // Update a trip itinerary
  updateItinerary(itinerary: any): Observable<any> {
    const admin = localStorage.getItem('admin');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.put(`${this.baseUrl}/tripItineraries/${itinerary.id}`, itinerary, { headers });
  }

  // Delete a trip itinerary
  deleteItinerary(id: string): Observable<any> {
    const admin = localStorage.getItem('admin');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.delete(`${this.baseUrl}/tripItineraries/${id}`, { headers });
  }

  // Delete a review from a destination guide
  // deleteReview(destinationId: string, reviewId: string): Observable<any> {
  //   const admin = localStorage.getItem('admin');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
  //   return this.http.delete(`${this.baseUrl}/destinationDetails/${destinationId}/reviews/${reviewId}`, { headers });
  // }
}