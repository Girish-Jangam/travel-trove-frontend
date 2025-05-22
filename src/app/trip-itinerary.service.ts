import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define interfaces for better type safety
export interface TripItinerary {
  id: string;
  destination: string;
  activities: string[];
  lodging: string[];
  dining: string[];
}

export interface UserItinerary {
  id: string;
  itineraryId: string;
  startDate: string;
  endDate: string;
  duration: string; // Change this to string to match the backend
  activities: string[];
  lodging: string[];
  dining: string[];
}

@Injectable({
  providedIn: 'root',
})
export class TripItineraryService {
  private apiUrl = 'https://travel-trove-backend-jfmn.onrender.com/api/v1'; // Adjust if your backend runs on a different port
  // private apiUrl = 'https://3000-firebase-travelwebappgit-1746617609073.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api/v1'; // Adjust if your backend runs on a different port

  constructor(private http: HttpClient) {}

  // Trip Itineraries
  getTripItineraries(): Observable<TripItinerary[]> {
    return this.http.get<TripItinerary[]>(`${this.apiUrl}/tripItineraries`);
  }

  addTripItinerary(itinerary: TripItinerary): Observable<TripItinerary> {
    return this.http.post<TripItinerary>(`${this.apiUrl}/tripItineraries`, itinerary);
  }

  updateTripItinerary(itinerary: TripItinerary): Observable<TripItinerary> {
    return this.http.put<TripItinerary>(`${this.apiUrl}/tripItineraries/${itinerary.id}`, itinerary);
  }

  deleteTripItinerary(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tripItineraries/${id}`);
  }

  // Destination Guides
  getDestinationGuides(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/destinationGuides`);
  }

  addDestinationGuide(guide: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/destinationGuides`, guide);
  }

  updateDestinationGuide(guide: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/destinationGuides/${guide.id}`, guide);
  }

  deleteDestinationGuide(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/destinationGuides/${id}`);
  }

  // User Login
  getUserLogin(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/userLogin`);
  }

  // User Itineraries
  getUserItineraries(userName:string): Observable<UserItinerary[]> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserItinerary[]>(`${this.apiUrl}/userItineraries/${userName}`,{headers});
  }

  addUserItinerary(itinerary: UserItinerary): Observable<UserItinerary> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<UserItinerary>(
      `${this.apiUrl}/userItineraries`, 
      itinerary, 
      { headers }
    );
  }
  

  updateUserItinerary(itinerary: UserItinerary): Observable<UserItinerary> {
    return this.http.put<UserItinerary>(`${this.apiUrl}/userItenarary/${itinerary.id}`, itinerary);
  }

  deleteUserItinerary(id: string): Observable<void> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.apiUrl}/userItineraries/${id}`,{headers});
  }

  // Destination Details
  getDestinationDetails(destinationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/destinationDetails/${destinationId}`);
  }

  // User Reviews and Ratings
  getUserReviews(destinationId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/destinationDetails/${destinationId}/reviews`);
  }

  addUserReview(destinationId: string, review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/destinationDetails/${destinationId}/reviews`, review);
  }

  updateUserReview(destinationId: string, reviewId: string, review: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/destinationDetails/${destinationId}/reviews/${reviewId}`, review);
  }

  deleteUserReview(destinationId: string, reviewId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/destinationDetails/${destinationId}/reviews/${reviewId}`);
  }
}