import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AbonoService } from 'src/app/services/abono.service';

@Component({
  selector: 'app-partidos-view',
  templateUrl: './partidos-view.component.html',
  styleUrls: ['./partidos-view.component.css']
})
export class PartidosViewComponent implements OnInit {

  partidos: any = [];
  constructor(private abonoService: AbonoService) { }

  ngOnInit(): void {
    this.abonoService.getAllAbonosById().subscribe(res=>{
      let partidos: any = [];
      res.abonos.map((item) => {
        item.fk_paquete.fk_partidos.map((partido) => {
          partido.paquete = item.fk_paquete.nombre_paquete;
          partidos.push(partido)
        })
      });
      console.log(partidos)

      this.partidos = partidos;
    });
  }

}
