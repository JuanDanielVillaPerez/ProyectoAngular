import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';

@Component({
  selector: 'app-humedad',
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.css']
})
export class HumedadComponent implements OnInit {

  humedades:Valores[]

  constructor(private valservice:ValService) { 
    this.humedades = []
  }

  ngOnInit(): void {
    this.valservice.humedades().subscribe((data:any)=>{
      console.log(data)
      this.humedades = data
    })
  }

}
