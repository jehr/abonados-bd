import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalService } from './modal.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from './alert.service';
declare var $;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  header: HttpHeaders = new HttpHeaders().set('content-type', 'application/json');
  token: string;
   

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private alertService: AlertService
  ) {
    this.token = sessionStorage.getItem("token") || '';
  }

  login(correo: string, password: string) {
    let user = { correo: correo, password: password };
    let url = `${environment.urlApi}sign-in`;
    this.modalService.abrirModal('modalLoading');

    return this.http.post(url, user)
      .pipe(
        map((respuesta:any) => {
          this.modalService.cerarModal('modalLoading');
          if (respuesta) {
            return respuesta;
          }
        }),
        filter((resp: any, index) => {
          sessionStorage.setItem('token', resp.accessToken);
          this.token = resp.accessToken;
          return resp;
        }),
        catchError((err: any) => {
          this.modalService.cerarModal('modalLoading');
          this.alertService.mostrarAlertaSimplesPorTipo('error', err.error.message, '');
          return Observable.throw(err);
        })
      );

  }

  getUserLogged(): void {
    const helper = new JwtHelperService();
    const user = helper.decodeToken(sessionStorage.getItem('token'));
    return user;
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.token = null;
  }

  verifySesion(): boolean {
    return (!this.token) ? false : true;
  }

  register(nombre: string, apellidos:string, correo:string, celular:string, tipo_documento:string , numero_documento:string , direccion:string , ciudad:string, password:string, repeatPassword:string){
    
    let user = { nombre, apellidos, correo, celular, tipo_documento , numero_documento , direccion , ciudad, password, repeatPassword};
    let url = `${environment.urlApi}sign-up`;
    this.modalService.abrirModal('modalLoading');

    return this.http.post(url, user)
    .pipe(
      map((respuesta:any) => {
        this.modalService.cerarModal('modalLoading');
        if (respuesta) {
          return respuesta;
        }
      }),
      filter((resp: any, index) => {
        sessionStorage.setItem('token', resp.accessToken);
        this.token = resp.accessToken;
        return resp;
      }),
      catchError((err: any) => {
        this.modalService.cerarModal('modalLoading');
        return Observable.throw(err);
      })
    );

    return;
  }

}
