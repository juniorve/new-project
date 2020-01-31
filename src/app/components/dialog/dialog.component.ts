import { ParkingService } from './../../services/parking.service';
import { ComprobanteService } from './../../services/comprobante.service';
import { Component, OnInit, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { MaestroService } from '../../services/maestro-service.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [MaestroService, ComprobanteService, ParkingService]
})
export class DialogComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public detalle: any[] = [];
  public productos: any[] = [];

  constructor(private parkingService: ParkingService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute, private comprobanteService: ComprobanteService
    , private dialog: MatDialog, public dialogRef: MatDialogRef<DialogComponent>, public maestroService: MaestroService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data.comprobante) {
      this.getDetalleComprobante();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDetalleComprobante() {
    this.maestroService.busy = this.comprobanteService.getDetalleComprobante(this.data.comprobante._id).
      pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        res => {
          console.log(res);
          if (res.detalleComprobante) {
            this.detalle = res.detalleComprobante;
            for (const item of this.detalle) {
              this.getParkings(item)
            }
            console.log(this.detalle);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getParkings(item: any) {
    this.maestroService.busy = this.parkingService.getParkingById(item.idProducto).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          console.log(response);
          if (response.producto) {
            item.nameProducto = response.producto.nombre;
            item.color = response.producto.color;
            item.material = response.producto.material;
            item.marca = response.producto.marca;
            item.precioCompra = response.producto.precioCompra;
            item.ganancia = (response.producto.precioVenta - response.producto.precioCompra) * item.cantidad;
          }
        },
        error => {
        }
      );
  }
}



