import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { PartidoService } from 'src/app/services/partido.service';
import { EstadioService } from 'src/app/services/estadio.service';
declare var $;

@Component({
  selector: 'app-list-partidos',
  templateUrl: './list-partidos.component.html',
  styleUrls: ['./list-partidos.component.css']
})
export class ListPartidosComponent implements OnInit {

  partidos: any[] = [];
  estadios: any[] = [];
  equipo_local: string;
  equipo_visita: string;
  fecha_partido: string;
  hora: string;
  fk_estadio: string;
  fecha_view: string;
  equipo_local_view: string;
  equipo_visita_view: string;
  hora_view: string;
  estadio_view: string;
  moment: any = moment;
  equipoLocalEdit: string;
  equipoVisitaEdit: string;
  fechaEdit: string;
  horaEdit: string;
  fk_estadio_edit: string;
  _id: string;


  constructor(private partidoService: PartidoService,
    private estadioService: EstadioService,
    public modalService: ModalService,
    public userService: UserService,
    private alertService: AlertService,) { }

    ngOnInit(): void {
      this.loadPartidos();
      this.loadEstadios();
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

    if (!this.equipo_local || !this.equipo_visita || !this.fecha_partido || !this.hora || !this.fk_estadio) {
      this.alertService.mostrarAlertaSimplesPorTipo('warning', 'Todos los campos son obligatorios', '');
      return;
    }

    const partido = {
      equipo_local: this.equipo_local,
      equipo_visita: this.equipo_visita,
      fecha_partido: this.fecha_partido,
      hora: this.hora,
      fk_estadio: this.fk_estadio,
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
        this.fk_estadio = '';

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

  loadEstadios(): void {
    this.estadioService.getAllEstadios().subscribe((res) => {
      this.estadios = res.estadios;
    })
  }

  showModalView(id: string): void {
    this.partidoService.getPartidoById(id).subscribe((res) => {
      if(res.ok) {
        this.fecha_view = res.partido.fecha_partido;
        this.equipo_local_view = res.partido.equipo_local;
        this.equipo_visita_view = res.partido.equipo_visita;
        this.hora_view = res.partido.hora;
        // this.estadio_view = res.partido.estadio;
        this.modalService.abrirModal('modalViewPartido');
      } else {
        return;
      }
    });
  }

  deleteItem(item: any): void {
    this.partidoService.deletePartido(item._id).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        this.loadPartidos();
      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
    }
    )
  }

  showModalEdit(id: string): void {
    this.partidoService.getPartidoById(id).subscribe((res) => {
      if(res.ok) {
        console.log('res :>> ', res);
        this.fechaEdit = moment(res.partido.fecha_partido).format('YYYY-MM-DD');
        this.equipoLocalEdit = res.partido.equipo_local;
        this.equipoVisitaEdit = res.partido.equipo_visita;
        this.horaEdit = res.partido.hora;
        this._id = res.partido._id;
        this.fk_estadio_edit = res.partido.ciudad;
        this.modalService.abrirModal('modalEditPartido');
      } else {
        return;
      }
    });
  }

  editPartido() {

    if (!this.equipoLocalEdit || !this.equipoVisitaEdit || !this.fechaEdit  || !this.horaEdit) {
      this.alertService.mostrarAlertaSimplesPorTipo('warning', 'Todos los campos son obligatorios', '');
      return;
    }

    const estadio = {
      equipo_local: this.equipoLocalEdit,
      equipo_visita: this.equipoVisitaEdit,
      fecha_partido: this.fechaEdit,
      hora: this.horaEdit,
      fk_estadio: this.fk_estadio_edit,
      id: this._id
    }

    console.log('estadio :>> ', estadio);

    this.partidoService.editPartido(estadio).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        $('.dropify-clear').click();
        if ($('.dropify-wrapper').hasClass('has-error')) {
          $('.dropify-wrapper').removeClass('has-error');
        }

        this.equipoLocalEdit = '';
        this.equipoVisitaEdit = '';
        this.fechaEdit = '';
        this._id = '';
        this.horaEdit = '';
        this.fk_estadio_edit = '';

        this.loadPartidos();

      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
      this.modalService.cerarModal('modalEditPartido')
    });

  }

}
