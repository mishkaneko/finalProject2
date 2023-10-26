import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
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

@NgModule({
  declarations: [TransactionsComponent],
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
  ],
  exports: [TransactionsComponent],
})
export class TransactionsModule {}
