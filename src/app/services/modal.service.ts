import { Injectable } from '@angular/core';
declare var $;


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  idJquery: string = "";
  constructor() { }


  //Modal que funciona por medio de jquery
  abrirModal(id: string) {
    this.idJquery = `#${id}`;
    $(this.idJquery).modal({ backdrop: 'static', keyboard: false });
  }
  cerarModal(id: string) {
    this.idJquery = `#${id}`;
    $(this.idJquery).modal('hide');
  }
}
