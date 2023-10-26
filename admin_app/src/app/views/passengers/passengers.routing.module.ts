import { RideComponent } from './passengers-profile/ride-history/ride/ride.component';
import { RideHistoryComponent } from './passengers-profile/ride-history/ride-history.component';
import { PassengerPersonalInfoComponent } from './passengers-profile/passenger-personal-info/passenger-personal-info.component';
import { PassengersComponent } from './passengers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { $localize } from '@angular/localize/init';
import { PassengersProfileComponent } from './passengers-profile/passengers-profile.component';

const routes: Routes = [
  {
    path: '',
    component: PassengersComponent,
    data: {
      title: `Passengers`,
    },
  },
  {
    path: ':id',
    component: PassengersProfileComponent,
    data: {
      title: `Passengers Profile`,
    },
    children: [
      {
        path: '', // Empty path to load 'personal-information' by default
        redirectTo: 'personal-information',
        pathMatch: 'full',
      },
      {
        path: 'personal-information',
        component: PassengerPersonalInfoComponent,
        data: {
          title: `Passengers Personal Information`,
        },
      },
      {
        path: 'ride-history',
        component: RideHistoryComponent,
        data: {
          title: `Ride History`,
        },
      },
      {
        path: 'ride-history/:ride_id',
        component: RideComponent,
        data: {
          title: `Ride`,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassengersRoutingModule {}
