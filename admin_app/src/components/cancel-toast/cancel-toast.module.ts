import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelToastComponent } from './cancel-toast.component';
import { ButtonModule, ToastModule } from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CancelToastComponent],
  imports: [CommonModule, ToastModule, FontAwesomeModule, ButtonModule],
  exports: [CancelToastComponent],
})
export class CancelToastModule {}
