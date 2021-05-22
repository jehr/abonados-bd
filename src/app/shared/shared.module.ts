import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { ModalLoadingComponent } from './modal-loading/modal-loading.component';
import { GeneralModule } from '../general/general.module';



@NgModule({
  declarations: [ModalLoadingComponent],
  imports: [
    CommonModule,
    GeneralModule
  ],
  exports: [
    ModalLoadingComponent,
  ]
})
export class SharedModule { }
