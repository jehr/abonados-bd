import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-partidos',
  templateUrl: './list-partidos.component.html',
  styleUrls: ['./list-partidos.component.css']
})
export class ListPartidosComponent implements OnInit {

  constructor(private productService: ProductService,
    public modalService: ModalService,
    public userService: UserService,
    private alertService: AlertService,) { }

  ngOnInit(): void {
  }

  showModalAdd(): void {
    this.modalService.abrirModal('modalAddProduct');
  }

}
