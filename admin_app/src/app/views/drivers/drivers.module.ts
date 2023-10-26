import { DriversProfileModule } from './drivers-profile/drivers-profile.module';
import { DriversListModule } from './drivers-list/drivers-list.module';
import { DriversRoutingModule } from './drivers.routing.module';
import { DriversComponent } from './drivers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DriversComponent],
  imports: [
    CommonModule,
    DriversRoutingModule,
    DriversListModule,
    DriversProfileModule,
  ],
})
export class DriversModule {}
