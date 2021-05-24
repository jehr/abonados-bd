import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nombre: string;
  apellidos: string;
  correo: string;
  celular: string;
  tipo_documento: string;
  numero_documento: string;
  direccion: string;
  ciudad: string;
  password: string;
  repeatPassword: string;

  constructor(private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  register(): void {

    this.tipo_documento = 'Cedula';

    console.log('this.nombre :>> ', this.nombre);

    if (!this.nombre && !this.apellidos && !this.correo && !this.celular  && !this.tipo_documento && !this.numero_documento && !this.direccion && !this.ciudad  && !this.password && !this.repeatPassword)  { return; }
    this.userService.register(
       this.nombre, this.apellidos, this.correo, this.celular, this.tipo_documento, this.numero_documento, this.direccion, this.ciudad, this.password, this.repeatPassword)
      .subscribe((res: any) => {
        if (res.accessToken) {
          this.router.navigate(['/login']);
          this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        }else {
          this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
        }
      })
    this.router.navigate(['/login']);
  }

}
