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



@NgModule({
  declarations: [HomePageComponent, HeroComponent, MainComponent, NavbarComponent, ProductComponent, PaymentComponent, PaqueteComponent],
  imports: [
    CommonModule,
    GeneralModule,
    FormsModule
  ],
  exports: [
    HomePageComponent,
    PaymentComponent
  ]
})
export class HomeModule { }
