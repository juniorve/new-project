import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
import { Producto } from './../models/producto';
import { ApiService } from './api.service';


@Injectable()

export class SugerenciasService {

  public url: String;

  constructor(private apiService: ApiService) {
    this.url = GLOBAL.url;
  }

  saveSugerencia(sugerencia: any): Observable<any> {
    return this.apiService.post(this.url + 'sugerencias', sugerencia)
      .map(res => res.json());
  }

  getSugerenciaById(sugerenciaId = null): Observable<any> {
    return this.apiService.get(this.url + 'sugerencias/' + sugerenciaId)
      .map(res => res.json());
  }


  getSugerencias(): Observable<any> {
    return this.apiService.get(this.url + 'getsugerencias')
      .map(res => res.json());
  }

}
