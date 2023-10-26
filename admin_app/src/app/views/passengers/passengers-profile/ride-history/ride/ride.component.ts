import { DataService } from './../../../../../services/data.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveToastComponent } from '@docs-components/save-toast/save-toast.component';
import {
  faFloppyDisk,
  faPaperPlane,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss'],
})
export class RideComponent {
  passenger_id = 0;
  ride_id = 0;
  url = `/passengers/${this.passenger_id}/ride-history/${this.ride_id}`;
  faFloppyDisk = faFloppyDisk;
  faPaperPlane = faPaperPlane;
  faCircleInfo = faCircleInfo;

  formData: any;
  tableData: any;

  @ViewChild(SaveToastComponent) saveToast!: SaveToastComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {
    let match = location.hash.match(/passengers\/(\d+)\/ride-history\/(\d+)/);
    if (!match) {
      // redirect to driver list
      return;
    }
    this.passenger_id = +match[1];
    this.ride_id = +match[2];
  }

  ngOnInit(): void {
    this.url = `/passengers/${this.passenger_id}/ride-history/${this.ride_id}`;
    this.dataService.get(this.url).subscribe({
      next: (data: any) => {
        this.formData = data.ride[0];
        console.log(this.formData);

        this.tableData = data.refunds;
        console.log(this.tableData);
      },
      error: (error) =>
        console.error(`Error getting ride details of ${this.ride_id}: `, error),
    });
  }

  navigateToMatch() {
    this.router.navigate(['matches', this.formData.match_id]);
  }

  updatePassengerRideDetails() {
    let data = {
      id: this.ride_id,
      status: this.formData.status,
    };
    console.log('data: ', data);

    this.dataService.put(this.url, data).subscribe({
      next: (data: any) => {
        // this.formData = data;
      },
      error: (error) =>
        console.error(
          `Error updating ride details of ${this.ride_id}: `,
          error
        ),
    });

    this.saveToast.toggleToast();
  }

  addRefundRecord() {
    let data = {
      passenger_id: this.formData.passenger_id,
      amount: this.formData.amount,
      transaction_id: this.formData.transaction_id,
      remark: this.formData.refundRemark,
    };
    console.log(data);

    this.dataService.post(this.url, data).subscribe({
      next: (data: any) => {
        this.formData = data;
      },
      error: (error) => console.error(`Error adding refund record: `, error),
    });
    this.refreshPage();
    this.saveToast.toggleToast();
  }

  refreshPage() {
    window.location.reload();
  }
}
