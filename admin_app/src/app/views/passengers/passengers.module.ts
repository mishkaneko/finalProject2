import { PassengersListModule } from './passengers-list/passengers-list.module';
import { PassengersProfileModule } from './passengers-profile/passengers-profile.module';
import { PassengersRoutingModule } from './passengers.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersComponent } from './passengers.component';

@NgModule({
  declarations: [PassengersComponent],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    PassengersProfileModule,
    PassengersListModule,
  ],
})
export class PassengersModule {}
