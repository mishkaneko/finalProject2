import { PayoutModule } from './transactions/payout/payout.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DriverPersonalInfoModule } from './driver-personal-info/driver-personal-info.module';
import { DropdownModule, NavModule, NavbarModule } from '@coreui/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversProfileComponent } from './drivers-profile.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DriversProfileComponent],
  imports: [
    CommonModule,
    DropdownModule,
    DriverPersonalInfoModule,
    TransactionsModule,
    NavModule,
    RouterModule,
    NavbarModule,
    FontAwesomeModule,
    PayoutModule,
  ],
})
export class DriversProfileModule {}
