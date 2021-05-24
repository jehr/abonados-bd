import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.css']
})
export class PaqueteComponent implements OnInit {

  @Input() paquete: any;
  constructor(private modalServices: ModalService) { }

  ngOnInit(): void {
  }
  comprar() {
    this.modalServices.abrirModal('modalAbonado');
  }
}
