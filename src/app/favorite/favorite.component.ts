import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface destinationGuides {
  id: string;
  title: string;
  summary: string;
  photos: string[];
}

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  favorites: destinationGuides[] = [];
  photos: string = '';

  constructor(
    private favoriteService: FavoriteService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.favoriteService.getFavorites();
      this.favoriteService.favorites$.subscribe((favorites) => {
        this.favorites = favorites;
      });
    } else {
      alert('Please login to view your favorites.');
    }
  }

  // ✅ Add this method to check if a card is a favorite
  isFavorite(card: destinationGuides): boolean {
    return this.favorites.some((fav) => fav.id === card.id);
  }

  toggleFavorite(card: destinationGuides): void {
    if (this.authService.isAuthenticated()) {
      this.isFavorite(card)
        ? this.favoriteService.removeFavorite(card)
        : this.favoriteService.addFavorite(card);
    } else {
      alert('You must be logged in to add/remove favorites.');
      this.router.navigate(['/login']);
    }
  }

  loadProductDetails(id: string): void {
    this.router.navigate(['destinations/', id]);
  }
}
