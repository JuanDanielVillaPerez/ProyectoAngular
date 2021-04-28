import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';
import { timeMessage , successDialog } from 'src/app/functions/alerts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.prod';
import Ws from "@adonisjs/websocket-client"
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-pir',
  templateUrl: './pir.component.html',
  styleUrls: ['./pir.component.css']
})
export class PirComponent implements OnInit {
  adonisws = environment.adonisWS;
  ws:any;
  mov:any;

  
    // We use these empty structures as placeholders for dynamic theming.
    


  public detecta = []
  public nodetecta  = []

  pir:Valores[]
  movi:ValService[]

  constructor(private valservice:ValService, private cookie:CookieService) {
    this.pir = []
    this.movi = []
   }

  ngOnInit(): void {
    timeMessage('Cargando Informacion',500).then(() => {
      successDialog('Informacion cargada');
    });
    this.ws = Ws(this.adonisws,{
      path:"ws"
    })
    this.ws.connect()
    this.mov = this.ws.subscribe("pir")

    this.valservice.lastpir().subscribe((data:any)=>{
      this.mov.emit("message",[data])

    })
    this.mov.on("message",(data:any)=>{
      this.movi = data
      this.tabla()
    })


    this.valservice.pir().subscribe((data:any)=>{
      //console.log(data)
      this.pir = data
    })

    /*this.valservice.detecta().subscribe((data:any)=>{
      this.detecta = this.detecta.concat(data)
      this.barChartData[0].data = this.detecta
    })
    this.valservice.nodetecta().subscribe((data:any)=>{
      this.nodetecta = this.nodetecta.concat(data)
      this.barChartData[1].data = this.nodetecta
    })*/
  }

  tabla(){
    this.valservice.pir().subscribe((data:any)=>{
      //console.log(data)
      this.pir = data
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
