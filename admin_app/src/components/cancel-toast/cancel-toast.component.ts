import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-toast',
  templateUrl: './cancel-toast.component.html',
  styleUrls: ['./cancel-toast.component.scss'],
})
export class CancelToastComponent {
  position = 'top-end';
  visible = false;

  @Output() returnClicked: EventEmitter<void> = new EventEmitter<void>();

  toggleToast() {
    this.visible = !this.visible;
  }

  onReturnClick() {
    this.returnClicked.emit();
  }
}
