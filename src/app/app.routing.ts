import { SearchParkingComponent } from './components/search-parking/search-parking.component';
import { ListProductoComponent } from './components/parking/list-producto/list-producto.component';
import { EditParkingComponent } from './components/parking/edit-parking/edit-parking.component';
import { NewParkingComponent } from './components/parking/new-parking/new-parking.component';
import { AdmParkingComponent } from './components/parking/adm-parking/adm-parking.component';
import { ListSugerenciasComponent } from './components/list-sugerencias/list-sugerencias.component';
import { VentasComponent } from './components/ingresos/ventas/ventas.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ShowProductoComponent } from './components/show-producto/show-producto.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { EditProveedorComponent } from './components/proveedor/edit-proveedor/edit-proveedor.component';
import { MantProveedorComponent } from './components/proveedor/mant-proveedor/mant-proveedor.component';
import { NewProveedorComponent } from './components/proveedor/new-proveedor/new-proveedor.component';
import { ListProveedorComponent } from './components/proveedor/list-proveedor/list-proveedor.component';
import { ViewProveedorComponent } from './components/proveedor/view-proveedor/view-proveedor.component';
import { GanananciasComponent } from './components/ingresos/ganancias/ganancias.component';
import { SugerenciasComponent } from './components/sugerencias/sugerencias.component';
import { ComprasComponent } from './components/compras/compras.component';

const appRoutes: Routes = [
    {
    path: '',
    component: SidebarComponent,
    children: [
      {path:'edit-proveedor/:id', component: EditProveedorComponent},
      {path:'list-proveedor', component: ListProveedorComponent},
      {path:'view-proveedor/:id', component: ViewProveedorComponent},
      {path:'new-proveedor', component: NewProveedorComponent},
      //resumen
      {path:'ganancias', component: GanananciasComponent},
      {path:'ventas', component: VentasComponent},
      {path:'list-sugerencias', component: ListSugerenciasComponent},
      //PARKING
      {path:'mant-parking', component: AdmParkingComponent},
      {path:'adm-producto', component: MantProveedorComponent},
      {path:'edit-parking/:id', component: EditParkingComponent},
      {path:'new-parking', component: NewParkingComponent},
      {path:'list-producto', component: ListProductoComponent},
      {path: 'compras', component: ComprasComponent }
     ]
  },
  { path: 'categorias', component: CategoriasComponent },
  // { path: '', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'show-producto/:id', component: ShowProductoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'search-parking', component: SearchParkingComponent },
  { path: 'sugerencias', component: SugerenciasComponent },
  { path: '', redirectTo: '/principal', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

