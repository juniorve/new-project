import { DialogMapParkingComponent } from './components/parking/dialog-map-parking/dialog-map-parking.component';
import { SharedModule } from './shared/shared.module';
import { UserService } from './services/user.service';
import { EditParkingComponent } from './components/parking/edit-parking/edit-parking.component';
import { ListProductoComponent } from './components/parking/list-producto/list-producto.component';
import { AdmParkingComponent } from './components/parking/adm-parking/adm-parking.component';
import { NewParkingComponent } from './components/parking/new-parking/new-parking.component';
import { MaestroService } from './services/maestro-service.service';
import { MenuComponent } from './components/menu/menu.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { MaterialModule } from './shared/modules/material.module';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';
import { PrincipalComponent } from './components/principal/principal.component';

// import { ProveedorModule } from './components/proveedor/proveedor.module';
import { ListProveedorComponent } from './components/proveedor/list-proveedor/list-proveedor.component';
import { EditProveedorComponent } from './components/proveedor/edit-proveedor/edit-proveedor.component';
import { MantProveedorComponent } from './components/proveedor/mant-proveedor/mant-proveedor.component';
import { NewProveedorComponent } from './components/proveedor/new-proveedor/new-proveedor.component';
import { ViewProveedorComponent } from './components/proveedor/view-proveedor/view-proveedor.component';
import { GanananciasComponent } from './components/ingresos/ganancias/ganancias.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ShowProductoComponent } from './components/show-producto/show-producto.component';
import { NgBusyModule } from 'ng-busy';
import { SugerenciasComponent } from './components/sugerencias/sugerencias.component';
import { MAT_DATE_LOCALE } from '@angular/material';

import { DataTableModule } from 'primeng/datatable';
// import {TableModule} from 'primeng/table';
import { DropdownModule } from 'primeng/primeng';
import { VentasComponent } from './components/ingresos/ventas/ventas.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ListSugerenciasComponent } from './components/list-sugerencias/list-sugerencias.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ParkingService } from './services/parking.service';
import { HttpTokenInterceptor } from './components/interceptors/http-token.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { DialogParkingComponent } from './components/parking/dialog-parking/dialog-parking.component';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    DialogParkingComponent,
    DialogComponent,
    SidebarComponent,
    RegisterComponent,
    CategoriasComponent,
    MenuComponent,
    // proveedores
    EditProveedorComponent,
    MantProveedorComponent,
    NewProveedorComponent,
    ListProveedorComponent,
    ViewProveedorComponent,
    // parking
    AdmParkingComponent,
    NewParkingComponent,
    ListProductoComponent,
    GanananciasComponent,
    EditParkingComponent,

    CarritoComponent,
    ContactoComponent,
    ShowProductoComponent,
    SugerenciasComponent,
    VentasComponent,
    DialogComponent,
    ListSugerenciasComponent,
    ComprasComponent,
    DialogMapParkingComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    MaterialModule,
    DataTableModule,
    DropdownModule,
    HttpClientModule,
    BrowserAnimationsModule,
    routing,
    OverlayModule, ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDrxCURGOr6ViOwz8NHaiqPnpnWpyXaxD0',
      libraries: ['drawing']
    }),
    // BUSY
    NgBusyModule
    // ProveedorModule
  ],
  entryComponents: [DialogComponent, DialogParkingComponent, DialogMapParkingComponent],
  providers: [appRoutingProviders,
    MaestroService,
    ParkingService,
    UserService,
    ApiService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-Pe' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
