import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';
import Ws from "@adonisjs/websocket-client"
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adonisws = environment.adonisWS;

  ws:any;
  chat:any
  temperatura:any
  humedad:any
  humesuelo:any
  pir:any
  //mensajes:string[] = [];
  //msj:string;

  datalastemp: Valores[]
  datalasthume: Valores[]
  datalasthumesuelo: Valores[]
  datalastpir: Valores[]
 
  Foco = false;
  Bomba = false;
  Ventilador = false;


  constructor(private ValService: ValService, private cookie:CookieService) { 
    this.datalastemp=[]
    this.datalasthume=[]
    this.datalasthumesuelo=[]
    this.datalastpir=[]
  }

  ngOnInit(): void {
    
    
    //console.log(this.Foco)
    //console.log([this.cookie.get('token_acces')])

    this.ws = Ws(this.adonisws,{
      path: "ws"
    });

    this.ws.connect();
    
    this.chat = this.ws.subscribe("chat");
    this.temperatura = this.ws.subscribe("temperatura")
    this.humedad = this.ws.subscribe("humedad")
    this.humesuelo = this.ws.subscribe("humesuelo")
    this.pir = this.ws.subscribe("pir")

    //switches
    this.chat.on("message",(data:any)=>{
      //console.log(data)
      if(data == "f"){
        this.Foco = true;
      }
      if(data == "a"){
        this.Foco = false;
      }
      if(data == "x"){
        this.Ventilador = true;
      }
      if(data == "s"){
        this.Ventilador = false;
      }
      if(data == "b"){
        this.Bomba = true;
      }
      if(data == "z"){
        this.Bomba = false;
      }
    })

    //mostrar temperatura
    this.ValService.lastemp().subscribe((data:any)=>{
      //console.log(data)
      this.temperatura.emit("message",data)
    })
     this.temperatura.on("message",(data:any)=>{
      //console.log(data);
      this.datalastemp = data;
    })

    //mostrar humedad
    this.ValService.lasthume().subscribe((data:any)=>{
      //console.log(data)
      this.humedad.emit("message",data)  
    })
    this.humedad.on("message",(data:any)=>{
      //console.log(data);
      this.datalasthume = data;
    })

    //mostrar humedad del suelo
    this.ValService.lasthumesuelo().subscribe((data:any)=>{
      //console.log(data)
      this.humesuelo.emit("message",data)
    })
    this.humesuelo.on("message",(data:any)=>{
      //console.log()
      this.datalasthumesuelo = data;
    })

    //mostrar pir
    this.ValService.lastpir().subscribe((data:any)=>{
      //console.log(data)
      this.pir.emit("message",data)
    })
    this.pir.on("message",(data:any)=>{
      //console.log()
      this.datalastpir = data;
    })

    //setTimeout( () => { /*Your Code*/ }, 50000 );

  }

  salir(){
    this.cookie.delete('token_acces')
    window.location.reload()
  }

  foco(){
    //console.log(this.Foco)
    if(this.Foco == true){
      this.chat.emit("message","a")
    }
    if(this.Foco == false){
      this.chat.emit("message","f")
    }
  }
  bomba(){
    //console.log(this.Bomba)
    if(this.Bomba == true){
      this.chat.emit("message","z")
    }
    if(this.Bomba == false){
      this.chat.emit("message","b")
    }
  }
  ventilador(){
    //console.log(this.Ventilador)
    if(this.Ventilador == true){
      this.chat.emit("message","s")
    }
    if(this.Ventilador == false){
      this.chat.emit("message","x")
    }
  }
}
