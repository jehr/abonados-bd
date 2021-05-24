import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { PaqueteService } from 'src/app/services/paquete.service';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.css']
})
export class PaqueteComponent implements OnInit {

  @Input() paquete: any;
  constructor(private modalServices: ModalService, private paqueteService: PaqueteService) { }

  ngOnInit(): void {
  }
  comprar(paquete: any) {
    this.paqueteService.paqueteSelected = paquete;
    this.modalServices.abrirModal('modalAbonado');
  }
}
