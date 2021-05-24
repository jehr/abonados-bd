import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ServicesModule } from '../services/services.module';
import { AdministrationModule } from './administration/administration.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    ServicesModule,
    AdministrationModule,
    FormsModule
  ]
})
export class ComponentsModule { }
