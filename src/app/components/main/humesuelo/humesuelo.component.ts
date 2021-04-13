import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';

@Component({
  selector: 'app-humesuelo',
  templateUrl: './humesuelo.component.html',
  styleUrls: ['./humesuelo.component.css']
})
export class HumesueloComponent implements OnInit {

  humesuelo:Valores[]

  constructor(private valservice:ValService) {
    this.humesuelo = []
   }

  ngOnInit(): void {
    this.valservice.humedadelsuelo().subscribe((data:any)=>{
      console.log(data)
      this.humesuelo = data
    })
  }

}
