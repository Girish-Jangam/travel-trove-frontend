import { Component, OnInit } from '@angular/core';
import { TripItineraryService } from '../trip-itinerary.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itineraries-list',
  templateUrl: './itineraries-list.component.html',
  styleUrls: ['./itineraries-list.component.css']
})
export class ItinerariesListComponent implements OnInit {
  userItineraries: any[] = [];
  isLoading: boolean = false; // Track loading state
  errorMessage: string = '';
  isAuthenticated: boolean = false;
  userName!:any;

  constructor(
    private tripItineraryService: TripItineraryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.getUserData().subscribe(data=>{
      this.userName = data.username;
      this.getAllData();
    })
  }
  
  getAllData() {
    if (this.isAuthenticated) {
      console.log("something", this.userName)
      console.log("----333333333333333333---------------------"+this.userName)
      this.tripItineraryService.getUserItineraries(this.userName).subscribe(
      
        (data: any[]) => {
          this.userItineraries = data;
          this.isLoading = false; // Hide loading indicator after data loads
        },
        (error: any) => {
          this.errorMessage = 'Failed to load itineraries. Please try again.';
          console.error('Error loading itineraries:', error);
          this.isLoading = false; // Hide loading indicator in case of error
        }
      );
    } 
  }


  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToDestination(id: string): void {
    this.router.navigate([`/destination-details/${id}`]);
  }

  deleteItinerary(itineraryId: string): void {
    if (!this.isAuthenticated) {
      this.errorMessage = 'You must be logged in to delete itineraries.';
      return;
    }

    this.tripItineraryService.deleteUserItinerary(itineraryId).subscribe(
      () => {
        // Remove the deleted itinerary from the list
        this.userItineraries = this.userItineraries.filter(itinerary => itinerary.id !== itineraryId);
        console.log('Itinerary deleted successfully');
      },
      (error: any) => {
        this.errorMessage = 'Failed to delete itinerary. Please try again.';
        console.error('Error deleting itinerary:', error);
      }
    );
  }
}