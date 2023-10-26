import { Component } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-save-toast',
  templateUrl: './save-toast.component.html',
  styleUrls: ['./save-toast.component.scss'],
})
export class SaveToastComponent {
  position = 'bottom-end';
  visible = false;
  percentage = 0;
  faCircleCheck = faCircleCheck;

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }
}
