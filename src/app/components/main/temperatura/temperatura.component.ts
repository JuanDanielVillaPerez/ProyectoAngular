import { Component, OnInit } from '@angular/core';
import { Valores } from 'src/app/models/valores';
import { ValService } from 'src/app/services/val.service';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {

  temperaturas: Valores[]
  constructor(private ValService:ValService) {
    this.temperaturas=[]
   }

  ngOnInit(): void {
    this.ValService.temperaturas().subscribe((data:any)=>{
      console.log(data)
      this.temperaturas = data;
    })
  }

}
