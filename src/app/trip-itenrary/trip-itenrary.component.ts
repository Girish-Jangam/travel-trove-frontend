import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripItineraryService } from '../trip-itinerary.service';
import { AuthService } from '../auth.service';

// Define interfaces for better type safety
interface TripItinerary {
  id: string;
  destination: string;
  activities: string[];
  lodging: string[];
  dining: string[];
}

interface UserItinerary {
  id: string;
  itineraryId: string;
  startDate: string;
  endDate: string;
  duration: string; // Change this to string to match the backend
  activities: string[];
  lodging: string[];
  dining: string[];
}

@Component({
  selector: 'app-trip-itenrary',
  templateUrl: './trip-itenrary.component.html',
  styleUrls: ['./trip-itenrary.component.css']
})
export class TripItenraryComponent implements OnInit {
  tripForm: FormGroup;
  tripItineraries: TripItinerary[] = [];
  selectedItinerary?: TripItinerary | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  userName: any;

  constructor(private formBuilder: FormBuilder, private tripItineraryService: TripItineraryService ,private authService:AuthService) {
    this.tripForm = this.formBuilder.group({
      itinerary: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      activities: [[]],
      lodging: [[]],
      dining: [[]]
    });
  }

  ngOnInit() {


    if(this.authService.isAuthenticated()){
      this.authService.getUserData().subscribe(data=>{
        this.userName=data.username;
       // console.log(+"user---------------------------------"+this.userName);
       
      })}else {
        alert('Please login First.');
      }


    this.tripItineraryService.getTripItineraries().subscribe(
      (data) => {
        this.tripItineraries = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load itineraries. Please try again.';
        console.error('Error loading itineraries:', error);
      }
    );
  }

  

  onItineraryChange() {
    this.selectedItinerary = this.tripItineraries.find(
      (itinerary) => itinerary.id === this.tripForm.get('itinerary')?.value
    );

    if (this.selectedItinerary) {
      // Pre-select activities, lodging, and dining if available
      this.tripForm.patchValue({
        activities: this.selectedItinerary.activities || [],
        lodging: this.selectedItinerary.lodging || [],
        dining: this.selectedItinerary.dining || []
      });
    }
  }

  calculateDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const durationInDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Calculate days, adding 1 to include both start and end dates
    return durationInDays.toString(); // Convert to string to match the backend
  }

  submitUser() {
    if (this.selectedItinerary && this.tripForm.valid) {
      const startDate = this.tripForm.get('startDate')?.value;
      const endDate = this.tripForm.get('endDate')?.value;

      if (startDate && endDate) {
        const duration = this.calculateDuration(startDate, endDate);

        const userItinerary: UserItinerary = {
          id: this.userName, 
          itineraryId: this.selectedItinerary.id,
          startDate: startDate,
          endDate: endDate,
          duration: duration,
          activities: this.tripForm.get('activities')?.value,
          lodging: this.tripForm.get('lodging')?.value,
          dining: this.tripForm.get('dining')?.value
        };

        this.tripItineraryService.addUserItinerary(userItinerary).subscribe(
          () => {
            this.successMessage = 'Itinerary added successfully!';
            this.errorMessage = '';
            this.tripForm.reset();
            this.selectedItinerary = null;
          },
          (error) => {
            this.errorMessage = 'Failed to add itinerary. Please try again.';
            this.successMessage = '';
            console.error('Error adding itinerary:', error);
          }
        );
      } else {
        this.errorMessage = 'Please select both start and end dates.';
      }
    } else {
      this.errorMessage = 'Please select an itinerary and valid dates.';
    }
  }
}