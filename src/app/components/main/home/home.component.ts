import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';
import Ws from "@adonisjs/websocket-client"
import { CookieService } from 'ngx-cookie-service';

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
  toggleBtn = true
  datafoco:string = ""
  databomba:string = ""
  dataventilador:string = ""

  constructor(private ValService: ValService, private cookie:CookieService) { 
    this.datalastemp=[]
    this.datalasthume=[]
    this.datalasthumesuelo=[]
    this.datalastpir=[]
  }

  ngOnInit(): void {


    //wss://invernadero-api.herokuapp.com/
    //ws://127.0.0.1:3333/
    this.ws = Ws("wss://invernadero-api.herokuapp.com/",{
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

  salir(){
    this.cookie.delete('token_acces')
    window.location.reload()
  }
  
  foco(){
    //console.log("hola")
    this.ValService.lastfoco().subscribe((data:any)=>{
      this.datafoco = data.value
      console.log(this.datafoco)
    })
    if(this.datafoco == "OFF"){
      this.ValService.foco({"value":"ON"}).subscribe((data:any)=>{
        console.log(data)
      })
    }
    if(this.datafoco == "ON"){
      this.ValService.foco({"value":"OFF"}).subscribe((data:any)=>{
        console.log(data)
      })
    }
  }

  bomba(){
    this.ValService.lastbomba().subscribe((data:any)=>{
      this.databomba = data.value
      console.log(this.databomba)
    })
    if(this.databomba == "OFF"){
      this.ValService.bomba({"value":"ON"}).subscribe((data:any)=>{
        console.log(data)
      })
    }
    if(this.databomba == "ON"){
      this.ValService.bomba({"value":"OFF"}).subscribe((data:any)=>{
        console.log(data)
      })
    }
  }

  ventilador(){
    this.ValService.lastventilador().subscribe((data:any)=>{
      this.dataventilador = data.value
      console.log(this.dataventilador)
    })
    if(this.dataventilador == "OFF"){
      this.ValService.ventilador({"value":"ON"}).subscribe((data:any)=>{
        console.log(data)
      })
    }
    if(this.dataventilador == "ON"){
      this.ValService.ventilador({"value":"OFF"}).subscribe((data:any)=>{
        console.log(data)
      })
    }
  }

  

}
