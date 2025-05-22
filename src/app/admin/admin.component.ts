import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { IdGeneratorService } from '../id-generator.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  guideForm: FormGroup;
  itineraryForm: FormGroup;
  destinationGuides: any[] = [];
  tripItineraries: any[] = [];
  destinationGuidesWithReviews: any[] = [];
  editingGuide: any = null;
  editingItinerary: any = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private IdGeneratorService: IdGeneratorService
  ) {
    this.guideForm = this.formBuilder.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      history: ['', Validators.required],
      culture: ['', Validators.required],
      attractions: ['', Validators.required],
      lodging: ['', Validators.required],
      dining: ['', Validators.required],
      activities: ['', Validators.required],
      photos: ['', Validators.required]
    });
    this.itineraryForm = this.formBuilder.group({
      destination: ['', Validators.required],
      duration: ['', Validators.required],
      activities: ['', Validators.required],
      lodging: ['', Validators.required],
      dining: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadDestinationGuides();
    this.loadTripItineraries();
    // this.loadDestinationGuidesWithReviews();
  }

  loadDestinationGuides() {
    this.adminService.getDestinationGuides().subscribe(
      (data) => {
        this.destinationGuides = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load destination guides. Please try again.';
        console.error('Error loading destination guides:', error);
      }
    );
  }

  loadTripItineraries() {
    this.adminService.getTripItineraries().subscribe(
      (data) => {
        this.tripItineraries = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load trip itineraries. Please try again.';
        console.error('Error loading trip itineraries:', error);
      }
    );
  }

  // loadDestinationGuidesWithReviews() {
  //   this.adminService.getDestinationGuides().subscribe(
  //     (guides) => {
  //       this.destinationGuidesWithReviews = guides.map(guide => ({
  //         ...guide,
  //         reviews: []
  //       }));
  //       this.destinationGuidesWithReviews.forEach(guide => {
  //         this.adminService.getUserReviews(guide.id).subscribe(
  //           (reviews) => {
  //             guide.reviews = reviews;
  //           },
  //           (error) => {
  //             console.error(`Error loading reviews for guide ${guide.id}:`, error);
  //           }
  //         );
  //       });
  //     },
  //     (error) => {
  //       this.errorMessage = 'Failed to load destination guides. Please try again.';
  //       console.error('Error loading destination guides:', error);
  //     }
  //   );
  // }

  submitGuide() {
    // console.log("this.guideForm.value" + this.guideForm.value.title);
    // console.log("this.guideForm.value" + this.editingGuide);
    if (this.guideForm.valid) {
      let newGuideData;
      let guideData;
      if(this.editingGuide!==null){    
          guideData = {
          id: this.editingGuide.id,
          title: this.guideForm.value.title,
          summary: this.guideForm.value.summary,
          history: this.guideForm.value.history,
          culture: this.guideForm.value.culture,
          attractions: this.guideForm.value.attractions,
          lodging: this.guideForm.value.lodging,
          dining: this.guideForm.value.dining,
          activities:this.guideForm.value.activities,
          photos: this.guideForm.value.photos
        };
        
      }  
      newGuideData = {
        id: this.IdGeneratorService.generateObjectIdWithPrefix(),
        title: this.guideForm.value.title,
        summary: this.guideForm.value.summary,
        history: this.guideForm.value.history,
        culture: this.guideForm.value.culture,
        attractions: this.guideForm.value.attractions,
        lodging: this.guideForm.value.lodging,
        dining: this.guideForm.value.dining,
        activities:this.guideForm.value.activities,
        photos: this.guideForm.value.photos
      };
      
      if (this.editingGuide) {
        console.log("inside update")
        this.adminService.updateDestination(guideData).subscribe(
          () => {
            this.successMessage = 'Destination guide updated successfully!';
            this.errorMessage = '';
            this.loadDestinationGuides();
            // this.loadDestinationGuidesWithReviews();
            this.clearForm();
          },
          (error) => {
            this.errorMessage = 'Failed to update destination guide. Please try again.';
            this.successMessage = '';
            console.error('Error updating destination guide:', error);
          }
        );
      } else {
        this.adminService.addDestination(newGuideData).subscribe(
          () => {
            this.successMessage = 'Destination guide added successfully!';
            this.errorMessage = '';
            this.loadDestinationGuides();
            // this.loadDestinationGuidesWithReviews();
            this.clearForm();
          },
          (error) => {
            this.errorMessage = 'Failed to add destination guide. Please try again.';
            this.successMessage = '';
            console.error('Error adding destination guide:', error);
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  submitItinerary() {
    if (this.itineraryForm.valid) {
      let itineraryData;
      let newitineraryData;
      if(this.editingItinerary!==null){
          itineraryData = {
          id: this.editingItinerary.id,
          destination: this.itineraryForm.value.destination,
          duration: this.itineraryForm.value.duration,
          activities: this.itineraryForm.value.activities,
          lodging: this.itineraryForm.value.lodging,
          dining: this.itineraryForm.value.dining
          }
      }
      newitineraryData = {
        id: this.IdGeneratorService.generateSequentialId(),
        destination: this.itineraryForm.value.destination,
        duration: this.itineraryForm.value.duration,
        activities: this.itineraryForm.value.activities,
        lodging: this.itineraryForm.value.lodging,
        dining: this.itineraryForm.value.dining
      }
      // console.log(newitineraryData);
      // console.log(this.editingItinerary);
      if (this.editingItinerary) {
        this.adminService.updateItinerary(itineraryData).subscribe(
          () => {
            this.successMessage = 'Trip itinerary updated successfully!';
            this.errorMessage = '';
            this.loadTripItineraries();
            this.clearItineraryForm();
          },
          (error) => {
            this.errorMessage = 'Failed to update trip itinerary. Please try again.';
            this.successMessage = '';
            console.error('Error updating trip itinerary:', error);
          }
        );
      } else {
        this.adminService.addItinerary(newitineraryData).subscribe(
          () => {
            this.successMessage = 'Trip itinerary added successfully!';
            this.errorMessage = '';
            this.loadTripItineraries();
            this.clearItineraryForm();
          },
          (error) => {
            this.errorMessage = 'Failed to add trip itinerary. Please try again.';
            this.successMessage = '';
            console.error('Error adding trip itinerary:', error);
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  editGuide(guide: any) {
    this.editingGuide = guide;
    this.guideForm.patchValue(guide);
  }

  editItinerary(itinerary: any) {
    this.editingItinerary = itinerary;
    this.itineraryForm.patchValue(itinerary);
  }

  deleteGuide(id: string) {
    console.log(id);
    this.adminService.deleteDestination(id).subscribe(
      () => {
        this.successMessage = 'Destination guide deleted successfully!';
        this.errorMessage = '';
        this.loadDestinationGuides();
        // this.loadDestinationGuidesWithReviews();
      },
      (error) => {
        this.errorMessage = 'Failed to delete destination guide. Please try again.';
        this.successMessage = '';
        console.error('Error deleting destination guide:', error);
      }
    );
  }

  deleteItinerary(id: string) {
    this.adminService.deleteItinerary(id).subscribe(
      () => {
        this.successMessage = 'Trip itinerary deleted successfully!';
        this.errorMessage = '';
        this.loadTripItineraries();
      },
      (error) => {
        this.errorMessage = 'Failed to delete trip itinerary. Please try again.';
        this.successMessage = '';
        console.error('Error deleting trip itinerary:', error);
      }
    );
  }

  // deleteReview(destinationId: string, reviewId: string) {
  //   this.adminService.deleteReview(destinationId, reviewId).subscribe(
  //     () => {
  //       this.successMessage = 'Review deleted successfully!';
  //       this.errorMessage = '';
  //       // this.loadDestinationGuidesWithReviews();
  //     },
  //     (error) => {
  //       this.errorMessage = 'Failed to delete review. Please try again.';
  //       this.successMessage = '';
  //       console.error('Error deleting review:', error);
  //     }
  //   );
  // }

  clearForm() {
    this.guideForm.reset();
    this.editingGuide = null;
  }

  clearItineraryForm() {
    this.itineraryForm.reset();
    this.editingItinerary = null;
  }
}