import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { PaqueteService } from 'src/app/services/paquete.service';
import { PartidoService } from 'src/app/services/partido.service';
declare var $;

@Component({
  selector: 'app-list-paquetes',
  templateUrl: './list-paquetes.component.html',
  styleUrls: ['./list-paquetes.component.css']
})
export class ListPaquetesComponent implements OnInit {

  paquetes: any[] = [];
  paquetes_view: any[] = [];
  partidos: any[] = [];
  nombre_paquete: string;
  precio: string;
  descripcion_paquete: string;
  fk_partidos: any[];

  constructor(private paqueteService: PaqueteService,
    private partidoService: PartidoService,
    public modalService: ModalService,
    public userService: UserService,
    private alertService: AlertService,) { }

    ngOnInit(): void {
      this.loadPaquetes();
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
    this.modalService.abrirModal('modalAddPaquete');
  }

  savePaquete(): void {

    if (!this.nombre_paquete || !this.precio || !this.descripcion_paquete || !this.fk_partidos ) {
      this.alertService.mostrarAlertaSimplesPorTipo('warning', 'Todos los campos son obligatorios', '');
      return;
    }

    const paquete = {
      nombre_paquete: this.nombre_paquete,
      precio: this.precio,
      descripcion_paquete: this.descripcion_paquete,
      fk_partidos: this.fk_partidos,
    }

    this.paqueteService.sendPaquete(paquete).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        $('.dropify-clear').click();
        if ($('.dropify-wrapper').hasClass('has-error')) {
          $('.dropify-wrapper').removeClass('has-error');
        }

        this.nombre_paquete = '';
        this.descripcion_paquete = '';
        this.precio = '';
        this.fk_partidos = [];

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

  loadPartidos(): void {
    this.partidoService.getAllPartidos().subscribe((res) => {
      console.log('res.partidos :>> ', res.partidos);
      this.partidos = res.partidos;
    });
  }

  showModalView(id: string): void {
    this.paqueteService.getPaqueteById(id).subscribe((res) => {
      if(res.ok) {
        this.paquetes_view = res.paquete;
        this.modalService.abrirModal('modalViewPaquete');
      } else {
        return;
      }
    });
  }

  deleteItem(item: any): void {
    this.paqueteService.deletePaquete(item._id).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        this.loadPaquetes();
      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
    }
    )
  };

}
