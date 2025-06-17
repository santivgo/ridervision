import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  imports: [BaseChartDirective],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.sass'
})
export class StatsComponent {

  // @Input({required: true, alias: 'data'})
  dados: number[] =  [20, 10, 30, 2]
  // @Input({required: true, alias: 'labels'})

  labels:string[] = ['Showa', 'Heisei', 'Neo-Heisei', 'Reiwa']


   data = {

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
      }],
      options: {
      plugins: {
          legend: {
            display: false 
          }
        },
        scales: {
          r:{
            grid: {
            color: 'rgba(255, 255, 255, 0.56)', // 👈 Linhas circulares do fundo
            lineWidth: 1
          },
            ticks: {
              display: false
            }
          }
        }
      }
      
  }

}
