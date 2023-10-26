import { RideHistoryModule } from './ride-history/ride-history.module';
import { PassengerPersonalInfoModule } from './passenger-personal-info/passenger-personal-info.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersProfileComponent } from './passengers-profile.component';
import { NavModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PassengersProfileComponent],
  imports: [
    CommonModule,
    NavModule,
    RouterModule,
    FontAwesomeModule,
    PassengerPersonalInfoModule,
    RideHistoryModule,
  ],
})
export class PassengersProfileModule {}
