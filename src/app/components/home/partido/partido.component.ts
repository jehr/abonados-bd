import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AbonoService } from 'src/app/services/abono.service';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {

  moment: any = moment;
  @Input() partido: any;
  constructor(private modalServices: ModalService, private abonoService: AbonoService) { }

  ngOnInit(): void {
  }

}
