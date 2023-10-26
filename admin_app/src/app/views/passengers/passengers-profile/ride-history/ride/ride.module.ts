import { SaveToastModule } from './../../../../../../components/save-toast/save-toast.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  TableModule,
} from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RideComponent } from './ride.component';

@NgModule({
  declarations: [RideComponent],
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
export class RideModule {}
