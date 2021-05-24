import { Component, OnInit } from '@angular/core';
import { AbonoService } from 'src/app/services/abono.service';

@Component({
  selector: 'app-abonos-view',
  templateUrl: './abonos-view.component.html',
  styleUrls: ['./abonos-view.component.css']
})
export class AbonosViewComponent implements OnInit {

  abonos: any = [];
  constructor(private abonoService: AbonoService) { }

  ngOnInit(): void {
    this.abonoService.getAllAbonosById().subscribe(res=>{
      console.log(res);
      this.abonos = res.abonos;
    });
  }

}
