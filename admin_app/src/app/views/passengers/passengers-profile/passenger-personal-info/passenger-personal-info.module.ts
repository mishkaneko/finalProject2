import { SaveToastModule } from './../../../../../components/save-toast/save-toast.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengerPersonalInfoComponent } from './passenger-personal-info.component';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
} from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PassengerPersonalInfoComponent],
  imports: [
    CommonModule,
    SaveToastModule,
    CardModule,
    FormModule,
    FormsModule,
    GridModule,
    ButtonModule,
    FontAwesomeModule,
  ],
  exports: [PassengerPersonalInfoComponent],
})
export class PassengerPersonalInfoModule {}
