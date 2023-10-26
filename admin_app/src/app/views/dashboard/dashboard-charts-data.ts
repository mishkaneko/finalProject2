import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any',
})
export class DashboardChartsData {
  constructor() {
    this.initMainChart();
  }

  public mainChart: IChartProps = {};

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  initMainChart(period: string = 'Month') {
    const successfulMatches = getStyle('--cui-success') ?? '#4dbd74';
    const individualRides = getStyle('--cui-info') ?? '#20a8d8';
    const refunds = getStyle('--cui-warning') || '#f9b115';
    const cancelledRides = getStyle('--cui-danger') || '#f86c6b';
    const rejected = getStyle('--cui-primary') || '#321fdb';

    // mainChart
    this.mainChart['elements'] = period === 'Month' ? 12 : 27;
    this.mainChart['successData'] = [41, 52, 60, 48, 37, 61, 87, 61, 54, 60];
    this.mainChart['individualData'] = [21, 30, 14, 27, 7, 14, 16, 18, 14, 25];
    this.mainChart['refundData'] = [5, 7, 4, 8, 1, 7, 6, 9, 5, 6];
    this.mainChart['cancelledData'] = [10, 5, 8, 10, 7, 4, 14, 6, 12, 10];
    this.mainChart['rejectedData'] = [5, 4, 2, 4, 7, 2, 4, 3, 1, 4];

    let labels: string[] = [];
    if (period === 'Month') {
      labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
      ];
    } else {
      /* tslint:disable:max-line-length */
      const week = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ];
      labels = week.concat(week, week, week);
    }

    const colors = [
      {
        // successfulMatches
        backgroundColor: 'transparent',
        borderColor: successfulMatches || '#4dbd74',
        pointHoverBackgroundColor: '#fff',
      },
      {
        // individualRides
        borderColor: individualRides,
        pointHoverBackgroundColor: individualRides,
        borderWidth: 2,
      },
      {
        // refunds
        backgroundColor: 'transparent',
        borderColor: refunds || '#f9b115',
        pointHoverBackgroundColor: refunds,
        borderWidth: 2,
      },
      {
        // cancelledRides
        backgroundColor: 'transparent',
        borderColor: cancelledRides || '#f86c6b',
        pointHoverBackgroundColor: cancelledRides,
        borderWidth: 2,
      },
      {
        // rejected
        backgroundColor: 'transparent',
        borderColor: rejected || '#321fdb',
        pointHoverBackgroundColor: rejected,
        borderWidth: 2,
      },
    ];

    const datasets = [
      {
        data: this.mainChart['successData'],
        label: 'Successful Matches',
        ...colors[0],
      },
      {
        data: this.mainChart['individualData'],
        label: 'Individual Rides',
        ...colors[1],
      },
      {
        data: this.mainChart['refundData'],
        label: 'Refunds',
        ...colors[2],
      },
      {
        data: this.mainChart['cancelledData'],
        label: 'Cancelled',
        ...colors[3],
      },
      {
        data: this.mainChart['rejectedData'],
        label: 'Rejected',
        ...colors[4],
      },
    ];

    const plugins = {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          labelColor: function (context: any) {
            return {
              backgroundColor: context.dataset.borderColor,
            };
          },
        },
      },
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
          },
        },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(5),
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels,
    };
  }
}
