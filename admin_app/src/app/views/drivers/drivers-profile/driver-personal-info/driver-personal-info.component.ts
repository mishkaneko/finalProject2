import { DataService } from './../../../../services/data.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaveToastComponent } from '@docs-components/save-toast/save-toast.component';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

type FormData = {
  id: number;
  name: string;
  gender: string;
  hkid: string;
  phone: string;
  email: string;
  driving_license_no: string;
  taxi_driver_identity_plate: string;
  vehicle_license: string;
  license_plate_no: string;
};
@Component({
  selector: 'app-driver-personal-info',
  templateUrl: './driver-personal-info.component.html',
  styleUrls: ['./driver-personal-info.component.scss'],
})
export class DriverPersonalInfoComponent {
  driver_id = 0;
  faFloppyDisk = faFloppyDisk;
  url = `/drivers/${this.driver_id}/personal-information`;

  @ViewChild(SaveToastComponent) saveToast!: SaveToastComponent;

  formData!: FormData;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.driver_id = this.route.parent?.snapshot.params['id'];
      this.url = `/drivers/${this.driver_id}/personal-information`;
      console.log(this.url);
      this.dataService.get(this.url).subscribe({
        next: (data: any) => {
          this.formData = data;
        },
        error: (error) =>
          console.error(`Error getting match ${this.driver_id}: `, error),
      });
    });
  }

  updateDriverPersonalInfo() {
    this.dataService.put(this.url, this.formData).subscribe({
      next: (data: any) => {
        this.formData = data;
      },
      error: (error) =>
        console.error('Error updating driver personal info: ', error),
    });

    this.saveToast.toggleToast();
  }
}
