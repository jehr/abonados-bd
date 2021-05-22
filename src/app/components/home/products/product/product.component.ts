import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any;

  constructor(private modalServices:ModalService) {}

  ngOnInit(): void {}

  comprar() {
    this.modalServices.abrirModal('modalAbonado');
  }

}
