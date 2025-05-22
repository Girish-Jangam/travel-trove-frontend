import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // URL for your backend API
  private url = 'https://travel-trove-backend-jfmn.onrender.com/api/v1/userLogin';
  // private url = 'https://3000-firebase-travelwebappgit-1746617609073.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api/v1/userLogin';

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}