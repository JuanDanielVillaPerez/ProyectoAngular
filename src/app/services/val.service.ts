import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Valores } from '../models/valores';

@Injectable({
  providedIn: 'root'
})
export class ValService {
  apiURL = environment.apiURL;

  constructor(private http:HttpClient, private cookieservice:CookieService) { }

  httpheaders = {
    headers: new HttpHeaders({
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + this.cookieservice.get('token_acces')
    })
  };

  temperaturas():Observable<any>{
    return this.http.get(`${this.apiURL}temp`,this.httpheaders)
  }
  humedades():Observable<any>{
    return this.http.get(`${this.apiURL}humedad`,this.httpheaders)
  }
  humedadelsuelo():Observable<any>{
    return this.http.get(`${this.apiURL}humesuelo`,this.httpheaders)
  }
  pir():Observable<any>{
    return this.http.get(`${this.apiURL}pir`,this.httpheaders)
  }
  lastemp():Observable<any>{
    return this.http.get(`${this.apiURL}lastemp`,this.httpheaders)
  }
  lasthume():Observable<any>{
    return this.http.get(`${this.apiURL}lasthumedad`,this.httpheaders)
  }
  lasthumesuelo():Observable<any>{
    return this.http.get(`${this.apiURL}lasthumesuelo`,this.httpheaders)
  }
  lastpir():Observable<any>{
    return this.http.get(`${this.apiURL}lastpir`,this.httpheaders)
  }
  tempgraph():Observable<any>{
    return this.http.get(`${this.apiURL}graphtemp`,this.httpheaders)
  }
  humegraph():Observable<any>{
    return this.http.get(`${this.apiURL}graphume`,this.httpheaders)
  }
  mostemp():Observable<any>{
    return this.http.get(`${this.apiURL}mostemp`,this.httpheaders)
  }
  worstemp():Observable<any>{
    return this.http.get(`${this.apiURL}worstemp`,this.httpheaders)
  }
  mosthumedad():Observable<any>{
    return this.http.get(`${this.apiURL}mosthumedad`,this.httpheaders)
  }
  worsthumedad():Observable<any>{
    return this.http.get(`${this.apiURL}worsthumedad`,this.httpheaders)
  }
  seco():Observable<any>{
    return this.http.get(`${this.apiURL}seco`,this.httpheaders)
  }
  humedo():Observable<any>{
    return this.http.get(`${this.apiURL}humedo`,this.httpheaders)
  }
  detecta():Observable<any>{
    return this.http.get(`${this.apiURL}detecta`,this.httpheaders)
  }
  nodetecta():Observable<any>{
    return this.http.get(`${this.apiURL}nodetecta`,this.httpheaders)
  }

}
