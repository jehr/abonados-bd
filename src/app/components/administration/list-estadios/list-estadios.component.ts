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
  estadio_view: any[] = [];
  nameEstadio: string;
  cantEspectadores: string;
<<<<<<< HEAD
  ciudadEstadio: string;
=======
  espectadores_view: string;
  nombre_view: string;
  ciudad_view: string;
>>>>>>> main

  constructor(private estadioService: EstadioService,
    public modalService: ModalService,
    public userService: UserService,
    private alertService: AlertService,) { }

    ngOnInit(): void {
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
    this.modalService.abrirModal('modalAddEstadio');
  }

  saveEstadio(): void {

    if (!this.nameEstadio || !this.cantEspectadores || !this.ciudadEstadio) {
      this.alertService.mostrarAlertaSimplesPorTipo('warning', 'Todos los campos son obligatorios', '');
      return;
    }

    const estadio = {
      nombre: this.nameEstadio,
      espectadores: this.cantEspectadores,
      ciudad: this.ciudadEstadio
    }

    this.estadioService.sendEstadio(estadio).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        $('.dropify-clear').click();
        if ($('.dropify-wrapper').hasClass('has-error')) {
          $('.dropify-wrapper').removeClass('has-error');
        }

        this.nameEstadio = '';
        this.cantEspectadores = '';
        this.ciudadEstadio = '';

        this.loadEstadios();

      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
      this.modalService.cerarModal('modalAddEstadio')
    });
  }

  loadEstadios(): void {
    this.estadioService.getAllEstadios().subscribe((res) => {
      console.log('res :>> ', res);
      this.estadios = res.estadios;
    });
  }

  showModalView(id: string): void {
    this.estadioService.getEstadioById(id).subscribe((res) => {
      if(res.ok) {
        this.espectadores_view = res.estadio.espectadores;
        this.nombre_view = res.estadio.nombre;
        this.ciudad_view = res.estadio.ciudad;
        this.modalService.abrirModal('modalViewPartido');
      } else {
        return;
      }
    });
  }

  deleteItem(item: any): void {
    this.estadioService.deleteEstadio(item._id).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        this.loadEstadios();
      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
    }
    )
  };

}
