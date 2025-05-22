import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DestinationService } from './destination.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchDestinationComponent } from './search-destination/search-destination.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { FavoriteComponent } from './favorite/favorite.component';
import { TripItenraryComponent } from './trip-itenrary/trip-itenrary.component';
import { HomeComponent } from './home/home.component';
import { GroupComponent } from './group/group.component';
import { JoinGroupComponent } from './join-group/join-group.component';
import { ChatComponent } from './chat/chat.component'; 
import { AdminComponent } from './admin/admin.component';
import { ItineraryCardComponent } from './itinerary-card/itinerary-card.component';
import { ItinerariesListComponent } from './itineraries-list/itineraries-list.component';
import { ReviewComponent } from './review/review.component';
// import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';







@NgModule({
  declarations: [
    AppComponent,
    SearchDestinationComponent,
    NavbarComponent,
    CardComponent,
    DestinationDetailComponent,
    RegisterComponent,
    LoginComponent,
    FavoriteComponent,
    TripItenraryComponent,

    HomeComponent,
          GroupComponent,
          JoinGroupComponent,
          ChatComponent,
          AdminComponent,
          ItineraryCardComponent,
          ItinerariesListComponent,
          ReviewComponent,
          // ReviewDetailComponent,
          AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [DestinationService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
