import { SaveToastModule } from './../../../../../components/save-toast/save-toast.module';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
} from '@coreui/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverPersonalInfoComponent } from './driver-personal-info.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DriverPersonalInfoComponent],
  imports: [
    CommonModule,
    CardModule,
    FormModule,
    FormsModule,
    GridModule,
    ButtonModule,
    FontAwesomeModule,
    SaveToastModule,
  ],
  exports: [DriverPersonalInfoComponent],
})
export class DriverPersonalInfoModule {}
