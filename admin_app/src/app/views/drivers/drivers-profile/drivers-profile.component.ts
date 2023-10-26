import { NameService } from './../../../services/name.service';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  faUser,
  faMoneyBillTransfer,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-drivers-profile',
  templateUrl: './drivers-profile.component.html',
  styleUrls: ['./drivers-profile.component.scss'],
})
export class DriversProfileComponent {
  id: number = 0;
  driverName: string = '';
  faUser = faUser;
  faMoneyBillTransfer = faMoneyBillTransfer;
  faChartLine = faChartLine;
  personalInfoActive = true;
  transactionsActive = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nameService: NameService
  ) {
    this.driverName = this.nameService.getName();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkActiveLinks(event.url);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  activateLink(link: string) {
    // Reset all links to false
    this.personalInfoActive = false;
    this.transactionsActive = false;

    // Set the active link based on the 'link' parameter
    if (link === 'personal-information') {
      this.personalInfoActive = true;
    } else if (link === 'transactions') {
      this.transactionsActive = true;
    }
  }

  private checkActiveLinks(url: string) {
    const personalInfoPattern = /\/personal-information(?:\/\d+)?/i;
    const transactionPattern = /\/transaction(?:\/\d+)?/i;

    if (personalInfoPattern.test(url)) {
      this.personalInfoActive = true;
      this.transactionsActive = false;
    } else if (transactionPattern.test(url)) {
      this.personalInfoActive = false;
      this.transactionsActive = true;
    } else {
      this.personalInfoActive = true;
      this.transactionsActive = false;
    }
  }
}
