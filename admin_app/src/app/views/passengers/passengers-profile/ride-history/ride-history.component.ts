import { DataService } from './../../../../services/data.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.scss'],
})
export class RideHistoryComponent {
  passenger_id: number = 0;
  url = `/passengers/${this.passenger_id}/ride-history`;

  tableData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.passenger_id = this.route.parent?.snapshot.params['id'];
    this.url = `/passengers/${this.passenger_id}/ride-history`;
    this.dataService.get(this.url).subscribe({
      next: (data: any) => {
        this.tableData = data;
      },
      error: (error) => {
        console.error(
          `Error getting ride history of passenger ${this.passenger_id}: `,
          error
        );
      },
    });
  }

  navigateToRide(ride_id: number) {
    this.router.navigate([
      'passengers',
      this.passenger_id,
      'ride-history',
      ride_id,
    ]);
  }
}
