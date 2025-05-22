import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDestinationComponent } from './search-destination/search-destination.component';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { GroupComponent } from './group/group.component';
import { JoinGroupComponent } from './join-group/join-group.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { TripItenraryComponent } from './trip-itenrary/trip-itenrary.component';
import { ItinerariesListComponent } from './itineraries-list/itineraries-list.component';

const routes: Routes = [
  {
    path:"" ,component:HomeComponent
  },
  {
    path: "search", component: SearchDestinationComponent,
  },
  {
    path: "destinations", component: SearchDestinationComponent
  },
  {
    path: "destinations/:id", component: DestinationDetailComponent
  },
  {
    path: "wishlist", component: FavoriteComponent
  },
  {
    path:"login" ,component:LoginComponent 
  },
  {
    path:"register" ,  component:RegisterComponent
  },
  {
    path: "admin", component: AdminLoginComponent
  },
  {
    path: "admin-dashboard", component: AdminComponent
  },
  {
    path: "trip-itinerary", component: TripItenraryComponent
  },
  {
     path: 'create-trip-groups', component: GroupComponent 
    },  // Route for Create Group page
  {
     path: 'join-trip-groups', component: JoinGroupComponent 
    },
    {
      path:'plan-trip', component:TripItenraryComponent
    },
    {
      path:'user-itenrary', component:ItinerariesListComponent
    },
    { 
      path: 'chat/:id', component: ChatComponent 

    },
  {
    path: "**", redirectTo: "/", pathMatch: "full"
  }
  // { path: 'groups', component: GroupComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
