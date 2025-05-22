import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../favorite.service';

interface destinationGuides {
  id: string;
  title: string;
  summary: string;
  photos: string[];
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card!: destinationGuides; // Card data passed from parent component
  favorites: destinationGuides[] = []; // Local list of favorites
  

  constructor(public router: Router, private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    // Subscribe to the favorites observable to get updates when favorites change
    this.favoriteService.favorites$.subscribe((favorites) => {
      this.favorites = favorites; // Update the local favorites array
    });

    // Fetch the current favorites on page load
    this.favoriteService.getFavorites();

    
  }

  // Navigate to the product details page
  loadProductDetails(id: string): void {
    this.router.navigate(["destinations/", id]);
  }

  // Check if the card is in the favorites list
  isFavorite(card: destinationGuides): boolean {
    return this.favorites.some(fav => fav.id === card.id);
  }

  // Toggle the favorite status of the card
  toggleFavorite(card: destinationGuides): void {
    if (this.isFavorite(card)) {
      // If it's already a favorite, remove it
      this.favoriteService.removeFavorite(card);
    } else {
      // If it's not a favorite, add it
      this.favoriteService.addFavorite(card);
    }
  }
}
