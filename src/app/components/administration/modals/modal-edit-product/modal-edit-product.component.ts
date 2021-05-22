import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';
declare var $;
@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.css']
})
export class ModalEditProductComponent implements OnInit {

  constructor(
    public productService: ProductService,
    public modalService: ModalService,
    public alertService: AlertService,
  ) { }

  ngOnInit(): void {
  }

  editProduct(productItem): void {

    if (!productItem.name || !productItem.description  || !productItem.category || !productItem.stock || !productItem.price || !this.productService.product) {
      this.alertService.mostrarAlertaSimplesPorTipo('warning', 'Todos los campos son obligatorios', '');
      return;
    }

    const product = {
      id: productItem._id,
      name: productItem.name,
      description: productItem.description,
      createdAt: moment().format('dd-mm-yyyy'),
      category: productItem.category,
      stock: productItem.stock,
      price: productItem.price,
      product: this.productService.productImageEdit
    }

    const file = this.productService.productImageEdit;
    if(file) {
      if (!this.validateFileExtension(this.productService.productImageEdit, ['png', 'jpg', 'jpeg']) && this.productService.product) {
        this.alertService.mostrarAlertaSimplesPorTipo('error', 'La imagen que intenta subir no tiene una extensión correcta (png, jpg ó jpeg).', 'Opps!');
        return;
      }
    }


    this.productService.editProduct(product).subscribe((res) => {
      if (res.ok) {
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        $('.dropify-clear').click();
        if ($('.dropify-wrapper').hasClass('has-error')) {
          $('.dropify-wrapper').removeClass('has-error');
        }
      } else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
      this.productService.productImageEdit = null;
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

}
