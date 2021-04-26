import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';
import { timeMessage , successDialog } from 'src/app/functions/alerts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-husu',
  templateUrl: './husu.component.html',
  styleUrls: ['./husu.component.css']
})
export class HusuComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Humedad del suelo'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Seco' },
    { data: [], label: 'Humedo' }
  ];

  humesuelo:Valores[]

  public seco = []
  public mojado = []


  constructor(private valservice:ValService, private cookie:CookieService) {
    this.humesuelo = []
   }

  ngOnInit(): void {
    timeMessage('Cargando Informacion',500).then(() => {
      successDialog('Informacion cargada');
    });
    this.valservice.humedadelsuelo().subscribe((data:any)=>{
      console.log(data)
      this.humesuelo = data
    })

    setTimeout( () => { /*Your Code*/this.valservice.seco().subscribe((data:any)=>{
      console.log(data)
      this.seco = this.seco.concat(data)
      this.barChartData[0].data = this.seco
      
    })}, 5 );
    this.valservice.humedo().subscribe((data:any)=>{
      this.mojado = this.mojado.concat(data)
      this.barChartData[1].data = this.mojado
      
    })
    console.log(this.barChartData)
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
