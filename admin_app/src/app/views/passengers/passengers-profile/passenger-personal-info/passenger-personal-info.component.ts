import { DataService } from './../../../../services/data.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaveToastComponent } from '@docs-components/save-toast/save-toast.component';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

type FormData = {
  id: number;
  name: string;
  gender: string;
  phone: string;
  email: string;
};

@Component({
  selector: 'app-passenger-personal-info',
  templateUrl: './passenger-personal-info.component.html',
  styleUrls: ['./passenger-personal-info.component.scss'],
})
export class PassengerPersonalInfoComponent {
  passenger_id: number = 0;
  url = `/passengers/${this.passenger_id}/personal-information`;
  faFloppyDisk = faFloppyDisk;

  @ViewChild(SaveToastComponent) saveToast!: SaveToastComponent;

  formData!: FormData;
  // = {
  //   id: 1,
  //   name: 'Apple Au',
  //   gender: 'female',
  //   phone: '9123 4567',
  //   email: 'aaron@gmail.com',
  // };

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.passenger_id = this.route.parent?.snapshot.params['id'];
      this.url = `/passengers/${this.passenger_id}/personal-information`;
      console.log(this.url);
      this.dataService.get(this.url).subscribe({
        next: (data: any) => {
          this.formData = data;
        },
        error: (error) =>
          console.error(
            `Error getting passenger ${this.passenger_id}: `,
            error
          ),
      });
    });
  }

  updatePassengersPersonalInfo() {
    const data = this.formData;
    this.dataService.put(this.url, data).subscribe({
      next: (data: any) => {
        console.log(data);

        console.log('Successfully updated passenger personal info');
      },
      error: (error) => {
        console.error(
          `Error getting personal info of passenger ${this.passenger_id}: `,
          error
        );
      },
    });
    this.saveToast.toggleToast();
  }
}
