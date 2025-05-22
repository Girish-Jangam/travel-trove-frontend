import { Component, Input, OnInit } from '@angular/core';
import { TripItineraryService } from '../trip-itinerary.service';

@Component({
  selector: 'app-itinerary-card',
  templateUrl: './itinerary-card.component.html',
  styleUrls: ['./itinerary-card.component.css']
})
export class ItineraryCardComponent implements OnInit {
  @Input() itinerary: any; // Input property to receive the itinerary data
  photoUrl: string = ''; // URL for the location-specific photo

  constructor(private tripItineraryService: TripItineraryService) {}

  ngOnInit(): void {
    // Fetch destination details based on the itinerary's destination
    this.fetchDestinationDetails(this.itinerary.destination);
  }

  fetchDestinationDetails(destination: string): void {
    this.tripItineraryService.getDestinationDetails(destination).subscribe(
      (details: { photo: string; }) => {
        // Assuming the response contains a photo URL under a specific key, e.g., 'photo'
        if (details && details.photo) {
          this.photoUrl = details.photo;
        } else {
          this.photoUrl = ''; // Set to empty if no photo is available
        }
      },
      (error: any) => {
        console.error('Error fetching destination details:', error);
        this.photoUrl = ''; // Set to empty if there's an error
      }
    );
  }

  deleteItinerary(): void {
    if (this.itinerary.id) {
      this.tripItineraryService.deleteUserItinerary(this.itinerary.id).subscribe(
        () => {
          alert('Itinerary deleted successfully!');
          // Optionally, emit an event to notify the parent component to refresh the list
        },
        (error: any) => {
          alert('Failed to delete itinerary. Please try again.');
          console.error('Error deleting itinerary:', error);
        }
      );
    }
  }
}