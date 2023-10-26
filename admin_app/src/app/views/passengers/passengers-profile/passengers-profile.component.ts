import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  faUser,
  faClipboard,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { NameService } from 'src/app/services/name.service';

@Component({
  selector: 'app-passengers-profile',
  templateUrl: './passengers-profile.component.html',
  styleUrls: ['./passengers-profile.component.scss'],
})
export class PassengersProfileComponent {
  id: number = 0;
  passengerName: string = '';
  faUser = faUser;
  faClipboard = faClipboard;
  faChartLine = faChartLine;
  personalInfoActive = true;
  rideHistoryActive = false;
  summaryActive = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nameService: NameService
  ) {
    this.passengerName = this.nameService.getName();

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
    this.rideHistoryActive = false;

    // Set the active link based on the 'link' parameter
    if (link === 'personal-information') {
      this.personalInfoActive = true;
    } else if (link === 'ride-history') {
      this.rideHistoryActive = true;
    }
  }

  private checkActiveLinks(url: string) {
    const personalInfoPattern = /\/personal-information(?:\/\d+)?/i;
    const transactionPattern = /\/ride-history(?:\/\d+)?/i;

    if (personalInfoPattern.test(url)) {
      this.personalInfoActive = true;
      this.rideHistoryActive = false;
    } else if (transactionPattern.test(url)) {
      this.personalInfoActive = false;
      this.rideHistoryActive = true;
    } else {
      this.personalInfoActive = true;
      this.rideHistoryActive = false;
    }
  }
}
