import { Parking } from './../models/parking.model';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable()

export class ParkingService {

  public url: String;

  constructor(private apiService: ApiService) {
    this.url = GLOBAL.url;
  }

  saveParking(token, parking: Parking): Observable<any> {
    // const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    console.log(parking);
    return this.apiService.post(this.url + 'parkings', parking)
      .map(res => res);
  }

  getParkingById(parkingId): Observable<any> {
    /* const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers }); */

    return this.apiService.get(this.url + 'parkings/' + parkingId)
      .map(res => res);
  }


  /*   getParkings(token, user:any) {

      const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
      const options = new RequestOptions({ headers: headers });

      return this.apiService.get(this.url + 'parkings/'+user, options)
        .map(res => res.json());
    } */

  getParkings(): Observable<any> {

    /* const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers }); */

    return this.apiService.get(this.url + 'parkings')
      .map(res => res);
  }

  updateParking(id: String, parking: any): Observable<any> {
    const json = JSON.stringify(parking);
    const params = json;
    // const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.apiService.put(this.url + 'parkings/' + id, params)
      .map(res => res);
  }

  deleteParking(token, id: String): Observable<any> {
    /* const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers }); */

    return this.apiService.delete(this.url + 'parkings/' + id).map(res => res);
  }

}
