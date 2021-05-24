import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardsComponent } from './cards/cards.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ADMINISTRATION_ROUTES } from './administration.routes';
import { ModalViewProductComponent } from './modals/modal-view-product/modal-view-product.component';
import { ModalEditProductComponent } from './modals/modal-edit-product/modal-edit-product.component';
import { ModalAddProductComponent } from './modals/modal-add-product/modal-add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPaquetesComponent } from './list-paquetes/list-paquetes.component';
import { ListPartidosComponent } from './list-partidos/list-partidos.component';
import { ListEstadiosComponent } from './list-estadios/list-estadios.component';
import { ModalViewEstadioComponent } from './modals-estadio/modal-view-estadio/modal-view-estadio.component';
// import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  declarations: [AdministrationComponent, SidebarComponent, CardsComponent, ListProductsComponent, ModalViewProductComponent, ModalEditProductComponent, ModalAddProductComponent, ListPaquetesComponent, ListPartidosComponent, ListEstadiosComponent, ModalViewEstadioComponent],
  imports: [
    CommonModule,
    ADMINISTRATION_ROUTES,
    FormsModule,
    // ReactiveFormsModule
    // Ng2SmartTableModule
  ],
  exports: [AdministrationComponent]
})
export class AdministrationModule { }
