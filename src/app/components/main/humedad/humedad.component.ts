import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';
import { timeMessage , successDialog } from 'src/app/functions/alerts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.prod';
import Ws from "@adonisjs/websocket-client"

@Component({
  selector: 'app-humedad',
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.css']
})
export class HumedadComponent implements OnInit {
  adonisws = environment.adonisWS;

  ws:any;
  humedad:any;

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
  public barChartLabels: Label[] = [] /*= this.graphLabel*/;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    /*{ data: [], label: 'Humedad' }*/
  ];

  public graphLabel = []
  public graphdata = []

  humedades:Valores[]
  lasthume:Valores[]
  mosthume:Valores[]
  worsthume:Valores[]

  constructor(private valservice:ValService, private cookie:CookieService) { 
    this.humedades = []
    this.lasthume=[]
    this.mosthume=[]
    this.worsthume=[]
  }

  ngOnInit(): void {
    timeMessage('Cargando Informacion',500).then(() => {
      successDialog('Informacion cargada');
    });
    //socket
    this.ws = Ws(this.adonisws,{
      path:"ws"
    })
    this.ws.connect();
    this.humedad = this.ws.subscribe("humedad")

    //lasthume
    this.valservice.lasthume().subscribe((data:any)=>{
      this.humedad.emit("message",data)
    })
    this.humedad.on("message",(data:any)=>{
      this.lasthume = data
      this.tabla()
      this.consulta()
      this.grafica()
    })

    this.valservice.humedades().subscribe((data:any)=>{
      //console.log(data)
      this.humedades = data
    })
    this.valservice.humegraph().subscribe((graph:any)=>{
      for(var val of graph){
        const t = val.Valor
        const tt: number = +t
        this.graphdata.push(tt)
        const f = val.Fecha_Hora
        this.graphLabel.push(f)
      }
      this.barChartData = [
        {data:this.graphdata, label:"Humedad"}
      ]
      this.barChartLabels = this.graphLabel
      //console.log(this.barChartData);
      
    })
    
    this.valservice.mosthumedad().subscribe((data:any)=>{
      this.mosthume = data
    })
    this.valservice.worsthumedad().subscribe((data:any)=>{
      this.worsthume = data
    })

  }

  grafica(){
    this.valservice.humegraph().subscribe((graph:any)=>{
      for(var val of graph){
        const t = val.Valor
        const tt: number = +t
        this.graphdata.push(tt)
        const f = val.Fecha_Hora
        this.graphLabel.push(f)
      }
      this.barChartData = [
        {data:this.graphdata, label:"Humedad"}
      ]
      this.barChartLabels = this.graphLabel
      //console.log(this.barChartData);
      
    })
    var index = 0
    this.barChartLabels.splice(index,10)
    this.barChartData[0].data.splice(index,10)
  }
  consulta(){
    this.valservice.mosthumedad().subscribe((data:any)=>{
      this.mosthume = data
    })
    this.valservice.worsthumedad().subscribe((data:any)=>{
      this.worsthume = data
    })
  }
  tabla(){
    this.valservice.humedades().subscribe((data:any)=>{
      //console.log(data)
      this.humedades = data
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
