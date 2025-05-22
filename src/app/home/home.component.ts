import { Component, OnInit, OnDestroy } from '@angular/core';
import { DestinationService } from '../destination.service';
import { SharedService } from '../shared.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  destinations$: Observable<any[]> = this.sharedService.destinations$;
  filteredDestinations$ = this.sharedService.filteredDestinations$;
  searchQuery$ = this.sharedService.searchQuery$;
  searchQuery: string = '';

  slides: string[] = [
    '../../assets/IMAGES/BALI/balihotel5.jpg',
    '../../assets/IMAGES/Switzerland/chapel-bridge-lucerne.jpg',
    '../../assets/IMAGES/london/caption.jpg',
    '../../assets/IMAGES/london/garden-view-hotel.jpg'
  ];
  currentSlide: number = 0;
  currentSlideTitle: string = '';
  searchTerm: string = '';
  currentBgColor: string = '#007bff';
  bgColors: string[] = ['#007bff', '#ff6347', '#32cd32'];
  intervalId: any;
  errorMessage: string = '';

  constructor(
    private destinationService: DestinationService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.startCarousel();
    this.changeSearchBarBackground();

    // Subscribe to searchQuery$
    this.searchQuery$.subscribe(query => {
      this.searchQuery = query;  // Update local searchQuery variable
      console.log("Search query from sharedService:", query);
    });

    // Log filtered destinations
    this.filteredDestinations$.subscribe(destinations => {
      console.log("Filtered destinations:", destinations);
    });
  }

  // Carousel logic
  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.currentSlideTitle = this.getSlideTitle();
    }, 5000);
  }

  getSlideTitle(): string {
    const destinations = this.slides.map((_, i) => ({
      title: this.getSlideName(i)
    }));
    return destinations[this.currentSlide].title || '';
  }

  getSlideName(index: number): string {
    const slideNames = [
      'Bali Paradise',
      'Swiss Alps',
      'London Charm',
      'Paris Elegance'
    ];
    return slideNames[index] || '';
  }

  // Search functionality
  onSearch(query: string): void {
    console.log("Search query entered:", query);  // Log entered query
    this.sharedService.setSearchQuery(query);
  }

  navigateToDestination(id: string): void {
    this.router.navigate([`/destinations/${id}`]);
  }

  // Background color animation
  changeSearchBarBackground() {
    setInterval(() => {
      this.currentBgColor = this.bgColors[
        Math.floor(Math.random() * this.bgColors.length)
      ];
      console.log("Current background color:", this.currentBgColor);  // Log background color
    }, 3000);
  }

  // Methods to handle conditions for suggestions and no results
  shouldShowSuggestions(filteredDestinations: any[], searchQuery: string): boolean {
    return filteredDestinations.length > 0 && searchQuery.trim() !== '';
  }

  shouldShowNoResults(filteredDestinations: any[], searchQuery: string): boolean {
    return filteredDestinations.length === 0 && searchQuery.trim() !== '';
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}