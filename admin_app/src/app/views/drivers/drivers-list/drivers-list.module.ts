import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversListComponent } from './drivers-list.component';
import { ButtonModule, TableModule, UtilitiesModule } from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DriversListComponent],
  imports: [
    CommonModule,
    TableModule,
    UtilitiesModule,
    ButtonModule,
    FontAwesomeModule,
  ],
  exports: [DriversListComponent],
})
export class DriversListModule {}
