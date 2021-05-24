import { Component, OnInit } from '@angular/core';
import { PaqueteService } from 'src/app/services/paquete.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  paquetes: any[] = [];
  
  constructor(
    private paqueteService: PaqueteService
  ) { }

  ngOnInit(): void {
    this.paqueteService.getAllPaquetes().subscribe(res=>{
      this.paquetes = res.paquetes;
    });
  }

}
