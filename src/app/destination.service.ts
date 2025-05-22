import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  searchDestinations(searchQuery: any) {
    throw new Error('Method not implemented.');
  }
  private reviewSubject= new BehaviorSubject<any[]>([]);
  reviews$=this.reviewSubject.asObservable();
  baseUrl = 'https://travel-trove-backend-jfmn.onrender.com/api/v1/destinationGuides';
  baseUrl2 = 'https://travel-trove-backend-jfmn.onrender.com/api/v1/destinationDetails';
  reviewsUrl = 'https://travel-trove-backend-jfmn.onrender.com/api/v1/reviews'; // Adjust the URL as needed
  // baseUrl = 'https://3000-firebase-travelwebappgit-1746617609073.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api/v1/destinationGuides';
  // baseUrl2 = 'https://3000-firebase-travelwebappgit-1746617609073.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api/v1/destinationDetails';
  // reviewsUrl = 'https://3000-firebase-travelwebappgit-1746617609073.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api/v1/reviews'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  searchDestination(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getDestination(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl2}/${id}`);
  }

  submitReview(destinationId: string, review: any): Observable<any> {
    return this.http.put(`${this.reviewsUrl}/${destinationId}`, review).pipe(
      tap((response: any) => {
        // After submitting the review, emit the updated reviews list (assuming response.reviews contains the updated list)
        this.reviewSubject.next(response.reviews);
      })
    );
  }
  
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl2);
  }


}