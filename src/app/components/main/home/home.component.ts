import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
    this.ValService.lastemp().subscribe((data:any)=>{
      console.log(data)
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
  }

}
