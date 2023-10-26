import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayoutComponent } from './payout.component';
import { FormsModule } from '@angular/forms';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  TableModule,
} from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SaveToastModule } from '@docs-components/save-toast/save-toast.module';

@NgModule({
  declarations: [PayoutComponent],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    FormModule,
    FormsModule,
    GridModule,
    ButtonModule,
    FontAwesomeModule,
    SaveToastModule,
  ],
})
export class PayoutModule {}
