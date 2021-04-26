import { Component, OnInit } from '@angular/core';
import { timeMessage , successDialog } from 'src/app/functions/alerts';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {

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
    { data: [], label: 'Temperatura' }
  ];

  public graphLabel = []
  public graphdata = []
  
  temperaturas: Valores[]
  datalastemp: Valores[]
  mostemp: Valores[]
  worstemp: Valores[]

  constructor(private ValService:ValService, private cookie:CookieService) {
    this.temperaturas=[]
    this.datalastemp=[]
    this.mostemp=[]
    this.worstemp=[]
   }

  ngOnInit(): void {
    timeMessage('Cargando Informacion',500).then(() => {
      successDialog('Informacion cargada');
    });
    this.ValService.temperaturas().subscribe((data:any)=>{
      //console.log(data)
      this.temperaturas = data;
    })
    this.ValService.tempgraph().subscribe((graph:any)=>{
      //console.log(graph)
      //const tempVal = graph.Valor
      //console.log(tempVal)
      //this.barChartData = []
      for(var val of graph){
        //console.log(val)
        const t = val.Valor
        const tt: number = +t
        this.graphdata = this.graphdata.concat(tt)
        const f = val.Fecha_Hora
        this.graphLabel = this.graphLabel.concat(f)
        
        //this.barChartData.push({ data: tt , label:'Temperatura'});
        //console.log(t)
        //console.log(f) 
      }
      this.barChartLabels = this.graphLabel
      this.barChartData[0].data = this.graphdata
      console.log(this.graphdata)
      console.log(this.graphLabel)
    })
    this.ValService.lastemp().subscribe((data:any)=>{
      this.datalastemp = data
    })
    this.ValService.mostemp().subscribe((data:any)=>{
      this.mostemp = data
    })
    this.ValService.worstemp().subscribe((data:any)=>{
      this.worstemp = data
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
