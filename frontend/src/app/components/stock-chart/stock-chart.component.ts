import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective,} from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

'@angular/core';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './stock-chart.component.html',
  styleUrl: './stock-chart.component.css'
})
export class StockChartComponent implements OnChanges {
  @Input() chartData: any[] = [];
  @Input() chartLabel: string = '';

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: this.chartLabel,
        backgroundColor: 'rgba(63,81,181,0.3)',
        borderColor: 'rgba(63,81,181,1)',
      }
    ]
  };

  ngOnChanges() {
    if (this.chartData.length) {
      this.barChartLabels = this.chartData.map(product => product.name);
      this.barChartData.datasets[0].data = this.chartData.map(product => product.quantity);
      this.barChartData.datasets[0].label = this.chartLabel;
    }
  }
}
