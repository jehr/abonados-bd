import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { PaqueteService } from 'src/app/services/paquete.service';

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

  constructor(public paqueteService: PaqueteService, private modalService: ModalService) { }

  ngOnInit(): void {
    console.log(this.paqueteService.paqueteSelected)
  }

  comprar() {
    console.log('this.nombre_abonado :>> ', this.localidad);
  }

  cerrarModal(): void {
    this.modalService.cerarModal('modalAbonado');
  }

}
