import { DataService } from './../../../../services/data.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  driver_id: number = 0;
  url = `/drivers/${this.driver_id}/transactions`;

  tableData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.driver_id = this.route.parent?.snapshot.params['id'];
    this.url = `/drivers/${this.driver_id}/transactions`;
    console.log(this.url);

    this.dataService.get(this.url).subscribe({
      next: (data: any) => {
        this.tableData = data;
      },
      error: (error) => {
        console.error('Error getting transaction list: ', error);
      },
    });
  }

  navigateToPayout(transaction_id: number) {
    this.router.navigate([
      'drivers',
      this.driver_id,
      'transactions',
      transaction_id,
    ]);
  }
}
