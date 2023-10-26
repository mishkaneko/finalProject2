import { DataService } from './../../../services/data.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NameService } from 'src/app/services/name.service';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.scss'],
})
export class PassengersListComponent {
  url = `/passengers`;

  constructor(
    private router: Router,
    private dataService: DataService,
    private nameService: NameService
  ) {}

  tableData: any;

  ngOnInit() {
    this.dataService.get(this.url).subscribe({
      next: (data: any) => (this.tableData = data),
      error: (error) =>
        console.error('Error getting list of passengers: ', error),
    });
  }

  navigateToPassengerProfile(id: number, passenger_name: string) {
    this.nameService.setName(passenger_name);
    this.router.navigate(['passengers', id]);
  }
}
