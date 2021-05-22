import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // **********************************************************************
  // Método que permite mostrar alertas con la libreria sweetalert2: Autor:luanquidi
  // **********************************************************************
  mostrarAlertaSimplesPorTipo(tipo: string, mensaje: string, titulo: string) {

    if (tipo === 'question') {
      Swal.fire(titulo, mensaje, 'question'
      );
    }
    if (tipo === 'info') { Swal.fire(titulo, mensaje, 'info'); }

    if (tipo === 'success') { Swal.fire(titulo, mensaje, 'success'); }

    if (tipo === 'error') { Swal.fire(titulo, mensaje, 'error'); }

    if (tipo === 'warning') { Swal.fire(titulo, mensaje, 'warning'); }
  }

  // **********************************************************************
  // Alert formato de modal con img : autor:luanquidi
  // **********************************************************************
  mostrarModalAlert(titulo: string, mensaje: string, img: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      imageUrl: img,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
      animation: false
    });
  }
}
