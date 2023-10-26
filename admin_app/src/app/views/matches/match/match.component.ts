import { DataService } from './../../../services/data.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CancelToastComponent } from '@docs-components/cancel-toast/cancel-toast.component';
import { SaveToastComponent } from '@docs-components/save-toast/save-toast.component';
import { faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {
  match_id: number = 0;
  url = `/matches/${this.match_id}`;
  faTrash = faTrash;
  faCircleInfo = faCircleInfo;

  @ViewChild(SaveToastComponent) saveToast!: SaveToastComponent;
  @ViewChild(CancelToastComponent) cancelToast!: CancelToastComponent;

  formData!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.match_id = +params['id'];
      this.url = `/matches/${this.match_id}`;
      this.dataService.get(this.url).subscribe({
        next: (data: any) => {
          this.formData = data;
          console.log(this.formData);
        },
        error: (error) =>
          console.error(`Error getting match ${this.match_id}: `, error),
      });
    });
  }

  navigateToDriver() {
    console.log(this.formData.result.driver_id);

    console.log('this.formData.driver_id: ', this.formData.driver_id);

    this.router.navigate(['drivers', this.formData.result.driver_id]);
  }

  navigateToRideA() {
    console.log(
      ' this.formData.passengerIds[0]: ',
      this.formData.result.passengerIds[0]
    );

    this.router.navigate([
      'passengers',
      this.formData.result.passengerIds[0],
      'ride-history',
      this.formData.result.rideIds[0],
    ]);
  }

  navigateToRideB() {
    this.router.navigate([
      'passengers',
      this.formData.result.passengerIds[1],
      'ride-history',
      this.formData.result.rideIds[1],
    ]);
  }

  openCancelToast() {
    this.cancelToast.toggleToast();
  }

  onReturnButtonClick() {
    const data = { match_id: this.match_id };
    this.dataService.put(this.url, data).subscribe({
      next: (data: any) => {
        console.log(`Successfully cancelled match ${this.match_id}: `, data);
      },
      error: (error) => {
        console.error(`Error cancelling match ${this.match_id}: `, error);
      },
    });
    this.router.navigate(['matches']);
  }
}
