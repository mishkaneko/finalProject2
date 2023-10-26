import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faClock, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent {
  url = `/matches`;
  faClock = faClock;
  faPlus = faPlus;

  constructor(private router: Router, private dataService: DataService) {}

  tableData: any;

  ngOnInit() {
    this.dataService.get(this.url).subscribe({
      next: (data: any) => {
        this.tableData = data;
        console.log(this.tableData);
      },
      error: (error) => {
        console.error('Error getting list of matches: ', error);
      },
    });
  }

  navigateToMatch(id: number) {
    this.router.navigate(['matches', id]);
  }

  navigateToCreateMatch() {}
}
