import { UserService } from 'src/app/services/user.service';
import { Producto } from './../../../models/producto';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import { MatDialog } from '@angular/material'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaestroService } from '../../../services/maestro-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ParkingService } from 'src/app/services/parking.service';
declare const swal: any;


@Component({
  selector: 'app-edit-parking',
  templateUrl: './edit-parking.component.html',
  styleUrls: ['./edit-parking.component.css'],
  providers: [UserService]
})
export class EditParkingComponent implements OnInit, OnDestroy {

  public identity;
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public token;
  public url;
  public band_editar: boolean;
  public productos: Producto[] = [];
  public _idEvento: String;
  public cantidad: any = 0;
  constructor(
    private parkingService: ParkingService, private _route: ActivatedRoute, private maestroService: MaestroService,
    private _router: Router,
    private _userService: UserService) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getparkingByUser();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }


  getparkingByUser() {
    return;
    /* this.maestroService.busy = this.parkingService.getProductos(this.token, this.identity._id).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          console.log(response);
          if (!response.productos) {
          } else {
            this.productos = response.productos;
            this.cantidad = this.productos.length;
          }
        },
        error => {
        }
      ); */
  }

  editProducto(idProducto: String) {
    this._router.navigate(['/edit-producto/' + idProducto]);
  }


  deleteParking(idParking: any) {

    swal({
      title: 'Eliminar producto', text: '¿Usted esta seguro de eliminar el producto?', icon: 'info',
      buttons: ['Cancelar', 'Confirmar']
    })
      .then((deleteProd) => {
        if (deleteProd) {
          this.maestroService.busy = this.parkingService.deleteParking(this.token, idParking).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            response => {
              if (!response.producto) {
                swal('Error', 'El producto no se elimino correctamente', 'warning');
              } else {
                swal('Producto eliminado', 'El producto se elimino correctamente', 'success')
                  .then((deleteProd) => {
                    if (deleteProd) {
                      this.getparkingByUser();
                    }
                  });
              }
            },
            error => {
            }
          );
        }
      });
  }
}
