import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../destination.service';
import { interval } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface DestinationDetails {
  id: string;
  title: string;
  description: string;
  photos: string[];
  reviews: Review[];
  selectImage: string | null;
  history: string;  // Add the 'history' property
  culture: string;
}

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.css'],
})
export class DestinationDetailComponent implements OnInit, OnDestroy {
  destination?: DestinationDetails;
  tripid: string = '';
  photos: string[] = [];
  reviewForm!: FormGroup;
  reviews: Review[] = []; // Array for storing reviews
  newReview: Review = { user: '', rating: 5, comment: '' }; // For capturing the new review
  selectedImage: string | null = null;
  isPaused: boolean = false;
  history: any="";  
  culture: any="";  
  intervalId: any;
  currentIndex: number = 0;
  userName:string="";
  showReviewForm: boolean = false;
  successMessage: string = ''; 
  errorMessage: string = '';


  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
    private fb: FormBuilder ,
    private auth:AuthService,
    private cdRef:ChangeDetectorRef
  ) {
    
  }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.auth.getUserData().subscribe(data=>{
        this.userName=data.username;
       // console.log(+"user---------------------------------"+this.userName);
        this.reviewForm.patchValue({
          user:this.userName
        })
        
      })}else {
        alert('Please login First.');
      }

    this.getAllData();
    this.getProductDetails(this.tripid);
    this.searchDestination();
    this.startAutoScroll();

    

      this.reviewForm = this.fb.group({
        user: [{ value: this.userName, disabled: true }, Validators.required], // Set the username to be disabled
        rating: [5, Validators.required], // Rating field (default value 5)
        comment: ['', Validators.required], // Comment field (required)
      });

  }

 
  getAllData() {
    let tripid = this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      this.tripid = params['id'];
    });
  }

  getProductDetails(tripid: string) {
    this.destinationService.getDestination(tripid).subscribe((res) => {
      this.destination = res;
      this.reviews = res.reviews || []; // Assign reviews from the API response
      
      //console.log('dkjfhskfkdsflkdsf'+this.destination);
    });
  }

  openReviewForm() {
    if(this.auth.isAuthenticated()){
    this.showReviewForm = true;
  }else {
    alert('Please login to write your reviews.');
  }}

  closeReviewForm() {
    this.showReviewForm = false;
    this.reviewForm.reset({ user: this.userName, rating: 5, comment: '' });
  }


  submitReview() {
    if (this.reviewForm.valid) {
    
      const newReview = {...this.reviewForm.getRawValue()};
      this.destinationService.submitReview(this.tripid, newReview).subscribe(
        (data) => {
          this.reviews.push(data);
          this.successMessage = 'Review submitted successfully! Thank you for your feedback.';
          this.errorMessage = ''; 

          this.closeReviewForm();
          this.reviewForm.reset({ user: this.userName, rating: 5, comment: '' });
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);

        },
        (error) => {
          this.errorMessage = 'Error submitting review. Please try again later.'; // Error message
          this.successMessage = ''; // Clear any previous success messages
          console.error('Error submitting review:', error);
        }
      );
    }
  }
  openLightbox(){
    this.selectedImage=this.photos[this.currentIndex];
  }
  startAutoScroll(){
    this.intervalId=setInterval(()=>
    {
      if(!this.isPaused){
        this.nextImage();
      }
    },2500)
  }

  stopAutoScroll(){
    this.isPaused=true;
    clearInterval(this.intervalId);
  }

nextImage()
{
  this.currentIndex=(this.currentIndex + 1)%this.photos.length;
}
  closeLightbox(){
    this.selectedImage=null;
    this.isPaused=false;
    this.startAutoScroll();
  }

  searchDestination(){
    this.destinationService.searchDestination().subscribe((data) => {
      // console.log(this.destinations);
      // this.filterDestination = ;  
      
      this.photos = data.filter(item => item.id==this.tripid).map(item => item.photos)[0];
      this.history = data.filter(item => item.id==this.tripid).map(item => item.history);  // Set the history from the response
      this.culture = data.filter(item => item.id==this.tripid).map(item => item.culture); 
      console.log(data) // Set the culture from the response
      
      
    }
    )

  }
  ngOnDestroy(){
    clearInterval(this.intervalId);
  }

  
  // Scroll left
  scrollLeft() {
    const container = document.querySelector('.reviews-container') as HTMLElement;
    container.scrollBy({
      left: -300, // Adjust this value as per your layout
      behavior: 'smooth'
    });
  }

  // Scroll right
  scrollRight() {
    const container = document.querySelector('.reviews-container') as HTMLElement;
    container.scrollBy({
      left: 300, // Adjust this value as per your layout
      behavior: 'smooth'
    });
  }

}
