import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { PaqueteService } from 'src/app/services/paquete.service';
declare var $;

@Component({
  selector: 'app-list-paquetes',
  templateUrl: './list-paquetes.component.html',
  styleUrls: ['./list-paquetes.component.css']
})
export class ListPaquetesComponent implements OnInit {

  paquetes: any[] = [];
  nameEstadio: string;
  cantEspectadores: string;

  constructor(private paqueteService: PaqueteService,
    public modalService: ModalService,
    public userService: UserService,
    private alertService: AlertService,) { }

    ngOnInit(): void {
      this.loadPaquetes();
      setTimeout(() => {
        $('.dropifys').dropify({
          messages: {
            'default': '',
            'replace': '',
            'remove': 'Eliminar',
            'error': 'Ooops, something wrong happended.'
          }
        });
      }, 100);
    }

  showModalAdd(): void {
    this.modalService.abrirModal('modalAddEstadio');
  }

  saveEstadio(): void {

    if (!this.nameEstadio || !this.cantEspectadores) {
      this.alertService.mostrarAlertaSimplesPorTipo('warning', 'Todos los campos son obligatorios', '');
      return;
    }

    const paquete = {
      nombre: this.nameEstadio,
      espectadores: this.cantEspectadores,
    }

    this.paqueteService.sendPaquete(paquete).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        $('.dropify-clear').click();
        if ($('.dropify-wrapper').hasClass('has-error')) {
          $('.dropify-wrapper').removeClass('has-error');
        }

        this.nameEstadio = '';
        this.cantEspectadores = '';

        this.loadPaquetes();

      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
      this.modalService.cerarModal('modalAddEstadio')
    });
  }

  loadPaquetes(): void {
    this.paqueteService.getAllPaquetes().subscribe((res) => {
      this.paquetes = res.paquetes;
    });
  }

  showModalView(id: string): void {
    alert('juehdu');
    this.modalService.abrirModal('modalViewEstadio');
  }

}
