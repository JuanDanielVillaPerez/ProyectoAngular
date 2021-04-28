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
//import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-humesuelo',
  templateUrl: './humesuelo.component.html',
  styleUrls: ['./humesuelo.component.css']
})
export class HumesueloComponent implements OnInit {
  adonisws = environment.adonisWS;
  ws:any;
  hs:any;


  humesuelo:Valores[]
  datahumesuelo:Valores[]

  public seco = []
  public mojado = []


  constructor(private valservice:ValService, private cookie:CookieService) {
    this.humesuelo = []
    this.datahumesuelo = []
   }

  ngOnInit(): void {
    timeMessage('Cargando Informacion',500).then(() => {
      successDialog('Informacion cargada');
    });
    this.tabla()
    //socket
    this.ws = Ws(this.adonisws,{
      path:"ws"
    })
    this.ws.connect();
    this.hs = this.ws.subscribe("humesuelo")

    this.valservice.humedadelsuelo().subscribe((data:any)=>{
      //console.log(data)
      this.humesuelo = data
    })
    //lasthumesuelo
    this.valservice.lasthumesuelo().subscribe((data:any)=>{
      this.hs.emit("message",[data])
      this.tabla()
    })
    this.hs.on("message",(data:any)=>{
      this.datahumesuelo = [data]
      this.tabla()
      
     // this.grafica()
    })
    


    this.valservice.seco().subscribe((data:any)=>{
      this.hs.emit("message",data)
    })
    this.hs.on("message",(data:any)=>{
      this.seco = data
    })

    /*setTimeout( () => {this.valservice.seco().subscribe((data:any)=>{
      //console.log(data)
      this.seco.push(data)
      this.barChartData[0].data = this.seco
    })/*}, 1 );
    this.valservice.humedo().subscribe((data:any)=>{
      this.mojado.push(data)
      this.barChartData[1].data = this.mojado
      
      
    })*/
    //console.log(this.barChartData)
  }

  tabla(){
    this.valservice.humedadelsuelo().subscribe((data:any)=>{
      //console.log(data)
      this.humesuelo = data
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
