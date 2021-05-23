import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  nombre_abono: string;
  localidad: string;
  precio: string;
  numero_fila: string;
  numero_puesto: string;

  constructor() { }

  ngOnInit(): void {
  }

  comprar() {
    
    console.log('this.nombre_abonado :>> ', this.localidad);


  }

}
