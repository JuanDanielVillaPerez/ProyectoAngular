import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';
import Ws from "@adonisjs/websocket-client"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ws:any;
  chat:any
  //mensajes:string[] = [];
  //msj:string;

  datalastemp: Valores[]
  datalasthume: Valores[]
  datalasthumesuelo: Valores[]
  datalastpir: Valores[]

  constructor(private ValService: ValService) { 
    this.datalastemp=[]
    this.datalasthume=[]
    this.datalasthumesuelo=[]
    this.datalastpir=[]
  }

  ngOnInit(): void {

    this.ws = Ws("ws://invernadero-api.herokuapp.com/",{
      path: "ws"
    });

    this.ws.connect();
    this.chat = this.ws.subscribe("chat");

    //while (true){
     //window.location.reload();
     this.ValService.lastemp().subscribe((data:any)=>{
      console.log(data)
      this.chat.emit("message",data)
      
    })
     this.chat.on("message",(data:any)=>{
      console.log(data);
      this.datalastemp = data;
    })

  
    this.ValService.lasthume().subscribe((data:any)=>{
      console.log(data)
      this.datalasthume = data;
    })
    this.ValService.lasthumesuelo().subscribe((data:any)=>{
      console.log(data)
      this.datalasthumesuelo = data;
    })
    this.ValService.lastpir().subscribe((data:any)=>{
      console.log(data)
      this.datalastpir = data;
    })

    setTimeout( () => { /*Your Code*/ }, 50000 );

    //}
  }

  

}
