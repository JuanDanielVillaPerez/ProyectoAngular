import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';
import { timeMessage , successDialog } from 'src/app/functions/alerts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-humedad',
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.css']
})
export class HumedadComponent implements OnInit {

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
  public barChartLabels: Label[] /*= this.graphLabel*/;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Humedad' }
  ];

  public graphLabel = []
  public graphdata = []

  humedades:Valores[]

  constructor(private valservice:ValService) { 
    this.humedades = []
  }

  ngOnInit(): void {
    timeMessage('Cargando Informacion',500).then(() => {
      successDialog('Informacion cargada');
    });
    this.valservice.humedades().subscribe((data:any)=>{
      //console.log(data)
      this.humedades = data
    })
    this.valservice.humegraph().subscribe((graph:any)=>{
      for(var val of graph){
        const t = val.Valor
        const tt: number = +t
        this.graphdata = this.graphdata.concat(tt)
        const f = val.Fecha_Hora
        this.graphLabel = this.graphLabel.concat(f)
      }
      this.barChartLabels = this.graphLabel
      this.barChartData[0].data = this.graphdata
    })
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
