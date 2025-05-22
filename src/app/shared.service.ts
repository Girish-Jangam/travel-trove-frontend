import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DestinationService } from './destination.service';

interface DestinationGuide {
  id: string;
  title: string;
  summary: string;
  photos: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  private destinationsSubject = new BehaviorSubject<DestinationGuide[]>([]);
  destinations$ = this.destinationsSubject.asObservable();

  private filteredDestinationsSubject = new BehaviorSubject<DestinationGuide[]>([]);
  filteredDestinations$ = this.filteredDestinationsSubject.asObservable();

  constructor(private destinationService: DestinationService) {
    this.fetchDestinations();
  }

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
    this.filterDestinations(query);
  }

  private fetchDestinations(): void {
    // Assuming this method fetches all destinations from the backend
    this.destinationService.searchDestination().subscribe(data => {
      this.destinationsSubject.next(data);
      this.filterDestinations(this.searchQuerySubject.value); // Filter results based on current query
    });
  }

  private filterDestinations(query: string): void {
    const allDestinations = this.destinationsSubject.value;
    const filtered = allDestinations.filter(destination =>
      destination.title.toLowerCase().includes(query.toLowerCase())
    );
    this.filteredDestinationsSubject.next(filtered);
  }
}