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
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss'],
})
export class PayoutComponent {
  driver_id = 0;
  transaction_id = 0;
  faFloppyDisk = faFloppyDisk;
  faPaperPlane = faPaperPlane;
  faCircleInfo = faCircleInfo;
  url = `/drivers/${this.driver_id}/transactions/${this.transaction_id}`;

  formData: any;
  tableData: any;

  @ViewChild(SaveToastComponent) saveToast!: SaveToastComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {
    let match = location.hash.match(/drivers\/(\d+)\/transactions\/(\d+)/);
    if (!match) {
      // redirect to driver list
      return;
    }
    this.driver_id = +match[1];
    this.transaction_id = +match[2];
  }

  ngOnInit(): void {
    this.url = `/drivers/${this.driver_id}/transactions/${this.transaction_id}`;

    this.dataService.get(this.url).subscribe({
      next: (data: any) => {
        this.formData = data.transaction[0];
        this.tableData = data.payout;
        console.log(this.formData);
        console.log(this.tableData);
      },
      error: (error) => {
        console.error('Error getting payout details: ', error);
      },
    });
  }

  navigateToMatch() {
    this.router.navigate(['matches', this.formData.match_id]);
  }

  navigateToPassengerProfile() {
    this.router.navigate(['passengers', this.formData.passenger_id]);
  }

  updatePassengerTransaction() {
    let data = { id: this.transaction_id, remark: this.formData.remark };
    this.dataService.put(this.url, data).subscribe({
      next: (data: any) => {
        console.log(
          'Successfully updated passenger transaction @Payout: ',
          data
        );
      },
      error: (error) => {
        console.error('Error updating passenger transaction @Payout: ', error);
      },
    });

    this.saveToast.toggleToast();
  }

  addDriverPayout() {
    let data = {
      driver_id: this.driver_id,
      transaction_id: this.formData.transaction_id,
      admin_id: 1,
      amount: this.formData.driver_amount,
      remark: this.formData.payout_remark,
    };

    this.dataService.post(this.url, data).subscribe({
      next: (data: any) => {
        console.log('Successfully added driver payout @Payout: ', data);
      },
      error: (error) =>
        console.error('Error adding driver payout @Payout: ', error),
    });
    this.saveToast.toggleToast();
    this.refreshPage();
  }

  refreshPage() {
    window.location.reload();
  }
}
