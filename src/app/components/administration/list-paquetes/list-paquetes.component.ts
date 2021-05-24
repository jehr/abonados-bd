import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  paquetes_view;
  partidos: any[] = [];
  nombre_paquete: string;
  precio: string;
  descripcion_paquete: string;
  fk_partidos: any = {};
  nombre_view: string;
  precio_view: string;
  descripcion_view: string;
  paqueteEdit: string;
  precioEdit: string;
  descripcionEdit: string;
  fk_partidos_edit: any = {};
  _id: string;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;


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

    let partidos = [];
    for(let i = 0; i < this.fk_partidos.length; i++){
      partidos.push(this.fk_partidos[i].item_id);
    }

    const paquete = {
      nombre_paquete: this.nombre_paquete,
      precio: this.precio,
      descripcion_paquete: this.descripcion_paquete,
      fk_partidos: partidos,
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
      this.modalService.cerarModal('modalAddPaquete')
    });
  }

  loadPaquetes(): void {
    this.paqueteService.getAllPaquetes().subscribe((res) => {
      this.paquetes = res.paquetes;
    });
  }

  loadPartidos(): void {
    this.partidoService.getAllPartidos().subscribe((res) => {
      this.partidos = res.partidos;
      console.log('res.partidos :>> ', this.partidos);
      let dataArray = [];
      for(let i = 0; i < this.partidos.length; i++){
        let item_id = this.partidos[i]._id;
        let item_text = this.partidos[i].equipo_local + ' VS ' + this.partidos[i].equipo_visita;
        dataArray.push({item_id, item_text});
      }
      this.dropdownList = dataArray;
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };

    });
  }

  showModalView(id: string): void {
    this.paqueteService.getPaqueteById(id).subscribe((res) => {
      if(res.ok) {
        this.paquetes_view = res.paquete.fk_partidos;
        this.nombre_view = res.paquete.nombre_paquete;
        this.precio_view = res.paquete.precio;
        this.descripcion_view = res.paquete.descripcion_paquete;
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
  }

  showModalEdit(id: string): void {
    this.paqueteService.getPaqueteById(id).subscribe((res) => {
      if(res.ok) {
        console.log('res :>> ', res);
        this.paqueteEdit = res.paquete.nombre_paquete;
        this.precioEdit = res.paquete.precio;
        this.descripcionEdit = res.paquete.descripcion_paquete;
        this._id = res.paquete._id;
        this.fk_partidos_edit = res.paquete.fk_partidos;

        console.log('this.fk_partidos_edit :>> ', this.fk_partidos_edit);

        let dataArraySelect = [];
        for(let i = 0; i < this.fk_partidos_edit.length; i++){
          let item_id = this.fk_partidos_edit[i]._id;
          let item_text = this.fk_partidos_edit[i].equipo_local + ' VS ' + this.fk_partidos_edit[i].equipo_visita;
          dataArraySelect.push({item_id, item_text});
        }
        this.selectedItems = dataArraySelect;
        this.modalService.abrirModal('modalEditPaquete');
      } else {
        return;
      }
    });
  }

  editPaquete() {

    if (!this.paqueteEdit || !this.precioEdit || !this.descripcionEdit || !this.selectedItems ) {
      this.alertService.mostrarAlertaSimplesPorTipo('warning', 'Todos los campos son obligatorios', '');
      return;
    }

    let partidos = [];
    for(let i = 0; i < this.selectedItems.length; i++){
      partidos.push(this.selectedItems[i].item_id);
    }

    const estadio = {
      nombre_paquete: this.paqueteEdit,
      precio: this.precioEdit,
      descripcion_paquete: this.descripcionEdit,
      id: this._id,
      fk_partidos: partidos
    }

    this.paqueteService.editPaquete(estadio).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        $('.dropify-clear').click();
        if ($('.dropify-wrapper').hasClass('has-error')) {
          $('.dropify-wrapper').removeClass('has-error');
        }

        this.paqueteEdit = '';
        this.precioEdit = '';
        this.descripcionEdit = '';
        this._id = '';

        this.loadPaquetes();

      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
      this.modalService.cerarModal('modalEditPaquete')
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
