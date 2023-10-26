import { NameService } from './../../../services/name.service';
import { DataService } from './../../../services/data.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
})
export class DriversListComponent {
  faCircle = faCircle;

  constructor(
    private router: Router,
    private dataService: DataService,
    private nameService: NameService
  ) {}

  ngOnInit(): void {
    this.dataService.get('/drivers').subscribe({
      next: (data: any) => {
        this.tableData = data;
        console.log(this.tableData);
      },
      error: (error) => {
        console.error('Error fetching data: ', error);
      },
    });
  }

  tableData: any;

  navigateToDriverProfile(driver_id: number, driver_name: string) {
    this.nameService.setName(driver_name);
    this.router.navigate(['drivers', driver_id]);
  }
}
