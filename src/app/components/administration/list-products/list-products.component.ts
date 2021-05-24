import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  abonados: any[] = [];
  name: string;
  description: string;
  category: string;
  stock: string;
  price: string;
  date: any;
  product: File[];
  data_usuario: any = {};
  data_paquete: any = {};
  data_estadio:  any = {};


  constructor(
    private productService: ProductService,
    public modalService: ModalService,
    public userService: UserService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
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

  showModalView(id: string): void {
    this.productService.getProductById(id).subscribe((res) => {
      if(res.ok) {
        console.log('res :>> ', res);
        this.data_usuario = res.abonado.fk_usuario;
        this.data_paquete = res.abonado.fk_paquete;
        this.data_estadio = res.abonado.fk_estadio;
        // console.log('this.data_usuario :>> ', this.data_usuario);
        // console.log('this.data_paquete :>> ', this.data_paquete);
        // console.log('this.data_estadio :>> ', this.data_estadio);

        this.modalService.abrirModal('modalViewProduct');
      } else {
        return;
      }
    });
  }

  showModalEdit(product: any): void {
    this.modalService.abrirModal('modalEditProduct');
    this.productService.product = product;
  }

  showModalDelete(id: string): void {

  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((res) => {
      console.log('res.abonados user:>> ', res.abonados);
      this.abonados = res.abonados;
    });
  }

  validateFileExtension(file: File[], extensionValid: any[]): boolean {
    // Validar solo extensiones validas.
    let isValid = 0;
    for (let i = 0; i < file.length; i++) {
      const extension = file[i].name.split('.');
      for (let index = 0; index < extensionValid.length; index++) {
        if (extension[extension.length - 1].toUpperCase() === extensionValid[index].toUpperCase()) {
          isValid++;
        }
      }
    }
    return isValid > 0;
  }

  showModalAdd(): void {
    this.modalService.abrirModal('modalAddProduct');
  }

  deleteItem(item: any): void {
    this.productService.deleteProduct(item._id).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        this.loadProducts();
      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
    }
    )
  };

}

