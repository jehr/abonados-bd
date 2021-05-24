import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { AbonoService } from 'src/app/services/abono.service';
import { AlertService } from 'src/app/services/alert.service';
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

  constructor(public paqueteService: PaqueteService, private modalService: ModalService, private abonoService: AbonoService, private alertaService: AlertService) { }

  ngOnInit(): void {
    console.log(this.paqueteService.paqueteSelected)
  }

  comprar() {
    console.log('this.nombre_abonado :>> ', this.localidad);
  }

  abonarse(paquete: any): void {
    this.abonoService.abonarUsuario(paquete).subscribe(res => {
      if(res.ok) {
        this.alertaService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        this.cerrarModal();
      }else {
        this.alertaService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
    })
  }

  cerrarModal(): void {
    this.modalService.cerarModal('modalAbonado');
  }

}
