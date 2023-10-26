import { RideModule } from './ride/ride.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  TableModule,
  ToastModule,
  UtilitiesModule,
} from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RideHistoryComponent } from './ride-history.component';

@NgModule({
  declarations: [RideHistoryComponent],
  imports: [
    CommonModule,
    TableModule,
    UtilitiesModule,
    ButtonModule,
    RouterModule,
    CardModule,
    FormModule,
    CardModule,
    FormModule,
    FormsModule,
    GridModule,
    ToastModule,
    FontAwesomeModule,
    RideModule,
  ],
  exports: [RideHistoryComponent],
})
export class RideHistoryModule {}
