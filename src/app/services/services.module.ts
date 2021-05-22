import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { VerifyTokenService } from './verify-token.service';
import { AlertService } from './alert.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ModalService, UserService, ProductService, VerifyTokenService, AlertService]
})
export class ServicesModule { }
