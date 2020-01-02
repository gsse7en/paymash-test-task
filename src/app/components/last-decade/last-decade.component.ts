import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-last-decade',
  templateUrl: './last-decade.component.html',
  styleUrls: ['./last-decade.component.scss']
})
export class LastDecadeComponent implements OnInit, OnDestroy {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];
  private unsubscribe: Subject<void> = new Subject();

  constructor(private movies: MoviesService) { }

  ngOnInit() {
    this.movies.movies$.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.fillTable(res);
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private filterLastDecade(data: number[][]): number[][] {
    const thisYear = new Date().getFullYear();
    return data.filter(el => el[0] < thisYear && el[0] >= thisYear - 10);
  }

  private getRandomValue(): number {
    return Math.ceil(Math.random() * 256);
  }

  private fillTable(res: Movie[]): void {
    const counts = {};
    const years = res.map(el => {
      return el.year;
    });
    for (const el of years) {
      counts[el] = 1 + (counts[el] || 0);
    }
    const sortable = [];
    for (const el in counts) {
      if (counts.hasOwnProperty(el)) {
        sortable.push([+el, counts[el]]);
        this.pieChartColors[0].backgroundColor.push(`rgba(
          ${this.getRandomValue()},
          ${this.getRandomValue()},
          ${this.getRandomValue()},
        0.3)`);
      }
    }
    sortable.sort((a, b) => {
      return a[0] - b[0];
    });
    const filteredYears = this.filterLastDecade(sortable);

    for (const [key, value] of filteredYears) {
      this.pieChartLabels.push(key.toString());
      this.pieChartData.push(value);
    }
  }

}
