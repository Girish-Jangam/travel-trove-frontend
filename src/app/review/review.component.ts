import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinationService } from '../destination.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: any[] = [];
  showReviewForm: boolean = false;
  reviewForm!: FormGroup;
  user:string[]=[];
  comment:string[]=[]
  rating:any[]=[];
  userName:string="";
  showbutton :boolean =false;
  @ViewChild('reviewsContainer') reviewsContainer!: ElementRef;

 
  constructor(
    private fb: FormBuilder,
    private destinationService: DestinationService,
    private router: Router,
    public auth:AuthService
  ) {
    

  }

  ngOnInit() {
    this.fetchReviews();
    if(this.auth.isAuthenticated()){
      this.auth.getUserData().subscribe(data=>{
        this.userName=data.username;
        console.log(this.userName);
        this.reviewForm.patchValue({
          user:this.userName
        })
        
      })}

    
    this.reviewForm = this.fb.group({
    user: [{value:this.userName, disabled:true}, [Validators.required]],
      rating: [5, Validators.required],
      comment: ['', Validators.required]
    });




    this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            // Show navbar with search only on '/' or exactly '/destinations' (not '/destinations/:id')
            this.showbutton = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/destinations';
          }
        });
     

   
  }

  fetchReviews() {
    this.destinationService.getReviews().subscribe(
      (data) => {
        this.reviews = data.flat();        
        console.log(this.user);
        
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  openReviewForm() {
    if(this.auth.isAuthenticated()){
      
    this.showReviewForm = true;
  }else {
    alert('Please login to write your reviews.');
  }
  }
  closeReviewForm() {
    this.showReviewForm = false;
    this.reviewForm.reset({ user: this.userName, rating: 5, comment: '' });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      const newReview = this.reviewForm.value;
      this.destinationService.submitReview('dummyDestinationId', newReview).subscribe(
        (data) => {
          this.reviews.push(data);
          this.closeReviewForm();
        },
        (error) => {
          console.error('Error submitting review:', error);
        }
      );
    }
  }

  scrollLeft() {
    this.reviewsContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.reviewsContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

 
  viewReviewDetail(reviewId: string) {
    this.router.navigate(['/review', reviewId]);
  }
}