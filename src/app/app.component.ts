import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Traveltrove';

  showNavbar: boolean = false;  // Initially hide the navbar
  showDefaultNavbar: boolean = true;  // Initially show the default navbar

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Show navbar with search only on '/' or exactly '/destinations' (not '/destinations/:id')
        this.showNavbar = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/destinations';
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide the default navbar on '/' (home) and '/destinations' pages
        this.showDefaultNavbar = !(event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/destinations');
      }
    });
  }

}
