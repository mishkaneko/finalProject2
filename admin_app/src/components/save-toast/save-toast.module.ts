import { ToastModule } from '@coreui/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveToastComponent } from './save-toast.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [SaveToastComponent],
  imports: [CommonModule, ToastModule, FontAwesomeModule],
  exports: [SaveToastComponent],
})
export class SaveToastModule {}
