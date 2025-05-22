import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-destination',
  templateUrl: './search-destination.component.html',
  styleUrls: ['./search-destination.component.css']
})
export class SearchDestinationComponent {
  filteredDestinations$ = this.sharedService.filteredDestinations$;
  searchQuery$ = this.sharedService.searchQuery$;
  searchQuery: string = '';

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
  }
}