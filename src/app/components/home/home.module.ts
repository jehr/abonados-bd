import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HeroComponent } from './hero/hero.component';
import { GeneralModule } from 'src/app/general/general.module';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './products/product/product.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';
import { PaqueteComponent } from './paquete/paquete.component';
import { RouterModule } from '@angular/router';
import { MisAbonosComponent } from './mis-abonos/mis-abonos.component';
import { AbonosViewComponent } from './abonos-view/abonos-view.component';
import { AbonoComponent } from './abono/abono.component';
import { MisPartidosComponent } from './mis-partidos/mis-partidos.component';
import { PartidosViewComponent } from './partidos-view/partidos-view.component';
import { PartidoComponent } from './partido/partido.component';




@NgModule({
  declarations: [HomePageComponent, HeroComponent, MainComponent, NavbarComponent, ProductComponent, PaymentComponent, PaqueteComponent, MisAbonosComponent, AbonosViewComponent, AbonoComponent, MisPartidosComponent, PartidosViewComponent, PartidoComponent],
  imports: [
    CommonModule,
    GeneralModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HomePageComponent,
    PaymentComponent,
    MisAbonosComponent,
    MisPartidosComponent
  ]
})
export class HomeModule { }
