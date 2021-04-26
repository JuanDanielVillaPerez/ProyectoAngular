import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';
import { timeMessage , successDialog } from 'src/app/functions/alerts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pir',
  templateUrl: './pir.component.html',
  styleUrls: ['./pir.component.css']
})
export class PirComponent implements OnInit {

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
  public barChartLabels: Label[] = ['Sensor de movimiento'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Se detecta movimiento' },
    { data: [], label: 'No se detecta movimiento' }
  ];


  public detecta = []
  public nodetecta  = []

  pir:Valores[]

  constructor(private valservice:ValService, private cookie:CookieService) {
    this.pir = []
   }

  ngOnInit(): void {
    timeMessage('Cargando Informacion',500).then(() => {
      successDialog('Informacion cargada');
    });
    this.valservice.pir().subscribe((data:any)=>{
      console.log(data)
      this.pir = data
    })

    this.valservice.detecta().subscribe((data:any)=>{
      this.detecta = this.detecta.concat(data)
      this.barChartData[0].data = this.detecta
    })
    this.valservice.nodetecta().subscribe((data:any)=>{
      this.nodetecta = this.nodetecta.concat(data)
      this.barChartData[1].data = this.nodetecta
    })
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  actualizar(){
    window.location.reload()
  }

  salir(){
    this.cookie.delete('token_acces')
    window.location.reload()
  }

}
