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
  humedades():Observable<any>{
    return this.http.get(`${this.apiURL}humedad`)
  }
  humedadelsuelo():Observable<any>{
    return this.http.get(`${this.apiURL}humesuelo`)
  }
  pir():Observable<any>{
    return this.http.get(`${this.apiURL}pir`)
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
  tempgraph():Observable<any>{
    return this.http.get(`${this.apiURL}graphtemp`)
  }
  humegraph():Observable<any>{
    return this.http.get(`${this.apiURL}graphume`)
  }
  mostemp():Observable<any>{
    return this.http.get(`${this.apiURL}mostemp`)
  }
  worstemp():Observable<any>{
    return this.http.get(`${this.apiURL}worstemp`)
  }
  mosthumedad():Observable<any>{
    return this.http.get(`${this.apiURL}mosthumedad`)
  }
  worsthumedad():Observable<any>{
    return this.http.get(`${this.apiURL}worsthumedad`)
  }
  seco():Observable<any>{
    return this.http.get(`${this.apiURL}seco`)
  }
  humedo():Observable<any>{
    return this.http.get(`${this.apiURL}humedo`)
  }
  detecta():Observable<any>{
    return this.http.get(`${this.apiURL}detecta`)
  }
  nodetecta():Observable<any>{
    return this.http.get(`${this.apiURL}nodetecta`)
  }

}
