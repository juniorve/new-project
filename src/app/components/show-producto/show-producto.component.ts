import { ParkingService } from './../../services/parking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { MaestroService } from '../../services/maestro-service.service';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css'],
  providers: []
})
export class ShowProductoComponent implements OnInit, OnDestroy {

  public comentarioForm: FormGroup;
  public url;
  public idProducto;
  public producto: any = {};
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public comentarios = [
    {
      ruta: 'assets/images/productos/foto1.jpg', name: 'Manuela Cervantes',
      email: 'manuela@gmail.com', fecha: '27 febrero 2019',
      descripcion: 'Compre el juego de cocina hace poco, pero la calidad es increible y ha sido la mejor elección.'
    },
    {
      ruta: 'assets/images/productos/foto2.jpg', name: 'Andrea Sotomayo',
      email: 'andrea@gmail.com', fecha: '12 mayo 2019',
      descripcion: 'Decidi aprovechar la oferta y el hermoso diseño me enamoro, soy la envidia entre mis amigas.'
    }
  ]
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    public maestroService: MaestroService, private parkingService: ParkingService) {
    this.newForm();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.idProducto = params['id'];
        console.log(this.idProducto);
        this.listProductoById(this.idProducto);
      }
    });

    this.showCantidad();
    this.changeOption();
    this.initQuantity();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  showCantidad() {
    const span_Text = document.getElementById('quantity_value').innerText;
    console.log(span_Text);
  }

  listProductoById(idProducto) {
    console.log(idProducto);
    this.maestroService.busy = this.parkingService.getParkingById(idProducto).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      res => {
        console.log(res);
        this.producto = res.producto;
        this.viewImage(this.url + 'get-img-producto/' + this.producto.imagen);
      },
      error => {

      }
    );
  }

  payProducts(sumaTotal) {
    console.log('suma' + parseFloat(sumaTotal));
    const pagoTotal = sumaTotal + 10;
    this.router.navigate(['/pagar-total/' + pagoTotal]);
  }

  addProducto(producto: any) {
    producto.cantidadCarrito = parseFloat(document.getElementById('quantity_value').innerText);
    // this.showCantidad();
    // swal('Producto agregado','El producto fue agregado al carrito','success');

    console.log(producto);
    this.maestroService.addCarrito(producto);
  }

  addComentario() {
    const comentario: any = {};
    comentario.name = this.comentarioForm.controls['name'].value;
    comentario.fecha = this.comentarioForm.controls['fecha'].value;
    comentario.descripcion = this.comentarioForm.controls['descripcion'].value;
    comentario.ruta = 'assets/images/productos/blog_2.jpg';
    this.comentarios.push(comentario);
    console.log(this.comentarios);
    swal('Comentario realizado', 'Su comentario se registro exitosamente', {
      icon: 'success',
      closeOnClickOutside: false
    }).then(
      (comentarioRegister) => {
        if (comentarioRegister) {
          this.newForm();
        }
      }
    );
  }

  viewImage(ruta) {
    console.log(ruta);
    if ($('.single_product_thumbnails ul li').length) {
      const thumbs = $('.single_product_thumbnails ul li');
      const singleImage = $('.single_product_image_background');

      thumbs.each(function () {
        const item = $(this);
        // console.log(item);
        item.on('click', function () {
          thumbs.removeClass('active');
          item.addClass('active');
          const img = item.find('img').data('image');
          console.log(ruta);
          singleImage.css('background-image', 'url(' + ruta + ')');
        });
      });
    }
  }

  newForm() {
    this.comentarioForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      fecha: ['20 de junio 2019'],
      descripcion: ['', Validators.required]
    });
  }

  changeOption() {
    if ($('.tabs').length) {
      const tabs = $('.tabs li');
      const tabContainers = $('.tab_container');

      tabs.each(function () {
        const tab = $(this);
        const tab_id = tab.data('active-tab');

        tab.on('click', function () {
          if (!tab.hasClass('active')) {
            tabs.removeClass('active');
            tabContainers.removeClass('active');
            tab.addClass('active');
            $('#' + tab_id).addClass('active');
          }
        });
      });
    }
  }

  initQuantity() {
    if ($('.user_star_rating li').length) {
      const stars = $('.user_star_rating li');

      stars.each(function () {
        const star = $(this);

        star.on('click', function () {
          const i = star.index();

          stars.find('i').each(function () {
            $(this).removeClass('fa-star');
            $(this).addClass('fa-star-o');
          });
          for (let x = 0; x <= i; x++) {
            $(stars[x]).find('i').removeClass('fa-star-o');
            $(stars[x]).find('i').addClass('fa-star');
          };
        });
      });
    }


    if ($('.plus').length && $('.minus').length) {
      const plus = $('.plus');
      const minus = $('.minus');
      const value = $('#quantity_value');

      plus.on('click', function () {
        const x = parseInt(value.text());
        value.text(x + 1);
      });

      minus.on('click', function () {
        const x = parseInt(value.text());
        if (x > 1) {
          value.text(x - 1);
        }
      });
    }
  }


}
