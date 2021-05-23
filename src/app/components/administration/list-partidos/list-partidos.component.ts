import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { PartidoService } from 'src/app/services/partido.service';
declare var $;

@Component({
  selector: 'app-list-partidos',
  templateUrl: './list-partidos.component.html',
  styleUrls: ['./list-partidos.component.css']
})
export class ListPartidosComponent implements OnInit {

  partidos: any[] = [];
  equipo_local: string;
  equipo_visita: string;
  fecha_partido: string;
  hora: string;

  constructor(private partidoService: PartidoService,
    public modalService: ModalService,
    public userService: UserService,
    private alertService: AlertService,) { }

    ngOnInit(): void {
      this.loadPartidos();
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
    this.modalService.abrirModal('modalAddPartido');
  }

  savePartido(): void {

    if (!this.equipo_local || !this.equipo_visita || !this.fecha_partido || !this.hora) {
      this.alertService.mostrarAlertaSimplesPorTipo('warning', 'Todos los campos son obligatorios', '');
      return;
    }

    const partido = {
      equipo_local: this.equipo_local,
      equipo_visita: this.equipo_visita,
      fecha_partido: this.fecha_partido,
      hora: this.hora,
    }

    this.partidoService.sendPartido(partido).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        $('.dropify-clear').click();
        if ($('.dropify-wrapper').hasClass('has-error')) {
          $('.dropify-wrapper').removeClass('has-error');
        }

        this.equipo_local = '';
        this.equipo_visita = '';
        this.fecha_partido = '' ;
        this.hora = '';

        this.loadPartidos();

      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
      this.modalService.cerarModal('modalAddPartido')
    });
  }

  loadPartidos(): void {
    this.partidoService.getAllPartidos().subscribe((res) => {
      this.partidos = res.partidos;
    });
  }

  showModalView(id: string): void {
    this.modalService.abrirModal('modalViewEstadio');
  }

}
