import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Proveedor } from './../models/proveedor';
import { ApiService } from './api.service';


@Injectable()

export class ProveedorService {

  public url: String;

  constructor(private apiService: ApiService) {
    this.url = GLOBAL.url;
  }

  getTipos(token): Observable<any> {
    return this.apiService.get(this.url + 'tipos')
      .map(res => res.json());
  }

  saveProveedor(token, proveedor: Proveedor): Observable<any> {
    return this.apiService.post(this.url + 'proveedor', proveedor)
      .map(res => res.json());
  }

  getProveedor(token, proveedorId = null): Observable<any> {
    return this.apiService.get(this.url + 'proveedor/' + proveedorId)
      .map(res => res.json());
  }


  getProveedores(token, user: any): Observable<any> {
    return this.apiService.get(this.url + 'proveedores/' + user)
      .map(res => res.json());
  }

  getTProveedores(token): Observable<any> {
    return this.apiService.get(this.url + 'getproveedores')
      .map(res => res.json());
  }

  updateProveedor(token, id: String, proveedor: Proveedor): Observable<any> {
    return this.apiService.put(this.url + 'proveedor/' + id)
      .map(res => res.json());
  }

  deleteProveedor(token, id: String): Observable<any> {
    return this.apiService.delete(this.url + 'proveedor/' + id).map(res => res.json());
  }

}
