import { PayoutComponent } from './drivers-profile/transactions/payout/payout.component';
import { DriversComponent } from './drivers.component';
import { DriversProfileComponent } from './drivers-profile/drivers-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverPersonalInfoComponent } from './drivers-profile/driver-personal-info/driver-personal-info.component';
import { TransactionsComponent } from './drivers-profile/transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: DriversComponent,
    data: {
      title: 'Drivers',
    },
  },
  {
    path: ':id',
    component: DriversProfileComponent,
    data: {
      title: `Drivers Profile`,
    },
    children: [
      {
        path: '', // Empty path to load 'personal-information' by default
        redirectTo: 'personal-information',
        pathMatch: 'full',
      },
      {
        path: 'personal-information',
        component: DriverPersonalInfoComponent,
        data: {
          title: `Drivers Personal Information`,
        },
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
          title: `Transactions`,
        },
      },
      {
        path: 'transactions/:transaction_id',
        component: PayoutComponent,
        data: {
          title: `Payout`,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversRoutingModule {}
