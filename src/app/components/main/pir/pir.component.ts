import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';

@Component({
  selector: 'app-pir',
  templateUrl: './pir.component.html',
  styleUrls: ['./pir.component.css']
})
export class PirComponent implements OnInit {

  pir:Valores[]

  constructor(private valservice:ValService) {
    this.pir = []
   }

  ngOnInit(): void {
    this.valservice.pir().subscribe((data:any)=>{
      console.log(data)
      this.pir = data
    })
  }

}
