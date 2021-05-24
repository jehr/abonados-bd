import { Component, Input, OnInit } from '@angular/core';
import { AbonoService } from 'src/app/services/abono.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-abono',
  templateUrl: './abono.component.html',
  styleUrls: ['./abono.component.css']
})
export class AbonoComponent implements OnInit {

  @Input() abono: any;
  constructor(private modalServices: ModalService, private abonoService: AbonoService) { }

  ngOnInit(): void {
  }

}
