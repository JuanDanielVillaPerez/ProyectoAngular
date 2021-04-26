import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Valores } from '../models/valores';
import { Value } from '../models/value';

@Injectable({
  providedIn: 'root'
})
export class ValService {
  apiURL = environment.apiURL;
  apiFoco = environment.apiFoco;
  apiBomba = environment.apiBomba;
  apiVetilador = environment.apiVentilador;

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

  foco(value:Value):Observable<any>{
    return this.http.post(`${this.apiFoco}`,value)
  }
  lastfoco():Observable<any>{
    return this.http.get(`https://io.adafruit.com/api/v2/egperezr/feeds/focos.foco/data/last?x-aio-key=aio_kXxm11oYQqzwu46jnF5BQq7j5hp4`)
  }

  bomba(value:Value):Observable<any>{
    return this.http.post(`${this.apiBomba}`,value)
  }
  lastbomba():Observable<any>{
    return this.http.get(`https://io.adafruit.com/api/v2/egperezr/feeds/focos.bomba/data/last?x-aio-key=aio_kXxm11oYQqzwu46jnF5BQq7j5hp4`)
  }

  ventilador(value:Value):Observable<any>{
    return this.http.post(`${this.apiVetilador}`,value)
  }
  lastventilador():Observable<any>{
    return this.http.get(`https://io.adafruit.com/api/v2/egperezr/feeds/focos.ventilador/data/last?x-aio-key=aio_kXxm11oYQqzwu46jnF5BQq7j5hp4`)
  }

}
