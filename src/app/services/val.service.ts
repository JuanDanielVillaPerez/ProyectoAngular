import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Valores } from '../models/valores';

@Injectable({
  providedIn: 'root'
})
export class ValService {
  apiURL = environment.apiURL;
  constructor(private http:HttpClient) { }

  temperaturas():Observable<any>{
    return this.http.get(`${this.apiURL}temp`)
  }
  lastemp():Observable<any>{
    return this.http.get(`${this.apiURL}lastemp`)
  }
  lasthume():Observable<any>{
    return this.http.get(`${this.apiURL}lasthumedad`)
  }
  lasthumesuelo():Observable<any>{
    return this.http.get(`${this.apiURL}lasthumesuelo`)
  }
  lastpir():Observable<any>{
    return this.http.get(`${this.apiURL}lastpir`)
  }
}
