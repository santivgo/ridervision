import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ReviewService } from '../../../core/services/review.service';
import { UsersService } from '../../../core/services/users.service';
import { IUser } from '../../../core/interfaces/models/user.interface';

@Component({
  selector: 'app-stats',
  imports: [BaseChartDirective],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.sass'
})
export class StatsComponent implements AfterViewInit {
  constructor(
    private readonly _reviewService: ReviewService, 
    private readonly _userService: UsersService
  ) {}

  // Chart data properties
  dados: number[] = [];
  labels: string[] = [];
  
  // Chart configuration
  public radarChartType: 'radar' = 'radar';
  public radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: [],
    datasets: []
  };
  
  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false 
      }
    },
    scales: {
      r: {
        grid: {
          color: 'rgba(255, 255, 255, 0.56)', // Linhas circulares do fundo
          lineWidth: 1
        },
        ticks: {
          display: false
        }
      }
    }
  };

  ngAfterViewInit(): void {
    this._userService.getCurrentUser().subscribe((user: IUser) => {
      this._reviewService.getReviewsMediaByUser(user.id).subscribe((media) => {
        this.dados = Object.values(media);
        this.labels = Object.keys(media);
        
        // Update chart data after receiving the data
        this.updateChartData();
      });
    });
  }

  private updateChartData(): void {
    this.radarChartData = {
      labels: this.labels,
      datasets: [{
        label: 'Séries assistidas por era',  
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
        data: this.dados
      }]
    };
  }
}