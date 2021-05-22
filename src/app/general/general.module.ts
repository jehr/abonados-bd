import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { ImageLoadingComponent } from './image-loading/image-loading.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LogoComponent } from './logo/logo.component';



@NgModule({
  declarations: [ImageLoadingComponent, SpinnerComponent, LogoComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ImageLoadingComponent,
    SpinnerComponent,
    LogoComponent
  ]
})
export class GeneralModule { }
