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

  products: any[] = [];
  name: string;
  description: string;
  category: string;
  stock: string;
  price: string;
  date: any;
  product: File[];

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
    this.modalService.abrirModal('modalViewProduct');
  }

  showModalEdit(product: any): void {
    this.modalService.abrirModal('modalEditProduct');
    this.productService.product = product;
  }

  showModalDelete(id: string): void {

  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res.products;
    });
  }

  saveProduct(): void {

    if (!this.name || !this.description || !this.category || !this.stock || !this.price || !this.product) {
      this.alertService.mostrarAlertaSimplesPorTipo('warning', 'Todos los campos son obligatorios', '');
      return;
    }


    // let images = [];
    // [...this.project].forEach((item: any) => {
    //    images.push(item);
    // });

    const product = {
      name: this.name,
      description: this.description,
      createdAt: moment().format('dd-mm-yyyy'),
      category: this.category,
      stock: this.stock,
      price: this.price,
      product: this.product
    }

    if (!this.validateFileExtension(this.product, ['png', 'jpg', 'jpeg'])) {
      this.alertService.mostrarAlertaSimplesPorTipo('error', 'La imagen que intenta subir no tiene una extensión correcta (png, jpg ó jpeg).', 'Opps!');
      return;
    }
    this.productService.sendProduct(product).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        $('.dropify-clear').click();
        if ($('.dropify-wrapper').hasClass('has-error')) {
          $('.dropify-wrapper').removeClass('has-error');
        }

        this.name = '';
        this.description = '';
        this.category = '';
        this.stock = '';
        this.price = '';
        this.date = null;

        this.loadProducts();

      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
      this.modalService.cerarModal('modalAddProduct')
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

