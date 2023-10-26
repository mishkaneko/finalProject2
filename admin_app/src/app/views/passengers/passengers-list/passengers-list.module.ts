import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersListComponent } from './passengers-list.component';
import { ButtonModule, TableModule, UtilitiesModule } from '@coreui/angular';

@NgModule({
  declarations: [PassengersListComponent],
  imports: [CommonModule, TableModule, UtilitiesModule, ButtonModule],
  exports: [PassengersListComponent],
})
export class PassengersListModule {}
