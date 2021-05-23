import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { EstadioService } from 'src/app/services/estadio.service';
declare var $;


@Component({
  selector: 'app-list-estadios',
  templateUrl: './list-estadios.component.html',
  styleUrls: ['./list-estadios.component.css']
})
export class ListEstadiosComponent implements OnInit {

  estadios: any[] = [];
  nameEstadio: string;
  cantEspectadores: string;

  constructor(private estadioService: EstadioService,
    public modalService: ModalService,
    public userService: UserService,
    private alertService: AlertService,) { }

  ngOnInit(): void {
  }

  showModalAdd(): void {
    this.modalService.abrirModal('modalAddEstadio');
  }

  saveEstadio(): void {

    if (!this.nameEstadio || !this.cantEspectadores) {
      this.alertService.mostrarAlertaSimplesPorTipo('warning', 'Todos los campos son obligatorios', '');
      return;
    }

    const estadio = {
      nameEstadio: this.nameEstadio,
      cantEspectadores: this.cantEspectadores,
    }

    this.estadioService.sendProduct(estadio).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        $('.dropify-clear').click();
        if ($('.dropify-wrapper').hasClass('has-error')) {
          $('.dropify-wrapper').removeClass('has-error');
        }

        this.nameEstadio = '';
        this.cantEspectadores = '';

        this.loadEstadios();

      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
      this.modalService.cerarModal('modalAddEstadio')
    });
  }

  loadEstadios(): void {
    this.estadioService.getAllProducts().subscribe((res) => {
      this.estadios = res.estadios;
    });
  }

}
