import { ParkingService } from './../../../services/parking.service';
import { Producto } from './../../../models/producto';
import { Component, OnInit, OnChanges } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import {Router,ActivatedRoute, Params} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css'],
  providers: [UserService]
})

export class ListProductoComponent implements OnInit {
  public identity;
  public token;
  public productos:Producto[]=[];
  public url;

  constructor(private _userService:UserService, 
    private parkingService:ParkingService,
    private _route:ActivatedRoute,
    private _router:Router) { 
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url=GLOBAL.url;
    }

  ngOnInit() {
    this.listParkings();
  }
  

  listParkings()
  {        
        this.parkingService.getParkings().subscribe(
            response =>{
              console.log(response);
              if(!response.productos){
                }else{
                    this.productos= response.productos;
                 }  
            },
          error =>{
          }
     );
    }
}
