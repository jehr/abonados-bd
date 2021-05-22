import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VerifyTokenService {

  nuevoToken: string;
  constructor(private http: HttpClient, private userService: UserService,
    private router: Router) {
  }


  verificarTiempoDeVidaToken(): Promise<boolean> | boolean {
    let token = this.userService.token;
    let payload = JSON.parse(atob(token.split(".")[1]));
    let expirado: boolean = this.tokenExpirado(payload.exp);
    // si el token ya esta expirado se retorna false para que el usuario no pueda seguir utilizando la pagina
    // y se retorna al usuario a login para que este obligado a iniciar sesión y generar un nuevo token
    if (expirado) {
      this.router.navigate(['/login']);// se envia al login token expirado
      return false;
    }

    return this.verificaRenuevaToken(payload.exp);

  }


  verificaRenuevaToken(fechaExp: number): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {
      let tokenExp: Date = new Date(fechaExp * 1000); // para convertir milesimas a segundos
      let ahora: Date = new Date();
      // se utiliza la libreria Moment que permite y facilita hacer comparaciones y validaciones entre fechas
      //entre multiples funcionalidades que tiene Document: https://momentjs.com/docs/#/displaying/difference/
      let dToken = moment(tokenExp);
      let dAhora = moment(ahora);
      let DiferenciaMinutos: number = dToken.diff(dAhora, 'minutes');

      // sumar 1 hora mas a la fecha actual : Tiemmpo de gracia que se le da al sistema para renovar el token
      //ahora.setTime(ahora.getTime() + 1 * 60 * 60 * 1000);
      /*** SE VALIDA SI FALTA  5  MINUTOS O MENOS PARA VENCER EL TOKEN****/
      if (DiferenciaMinutos > 5) {
        resolve(true);
      } else {
        //el token le falta menos de 5 minutos o menos para vencerse, se debe renovar
        this.renovarToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);// se envia al login token expirado o  no  es valido
            reject(false);
          });

      }

      //console.log(ahora);
      //console.log('Fecha token', tokenExp);
      resolve(true);

    });

  }

  //Método que valida si el token aun esta vigente o a expirado
  tokenExpirado(fechaExp: number): boolean {
    let ahora: number = new Date().getTime() / 1000; // convertir segundos a milesimas
    if (ahora > fechaExp) {
      return true
    } else {
      return false;
    }
  }

  renovarToken() {
    let url: string = `${environment.urlApi}refresh-access-token`;
    return this.http.post(url, {refreshToken: sessionStorage.getItem('token')})
      .pipe(
        map((token: any) => {
          this.nuevoToken = token.accessToken;
          sessionStorage.setItem('token', this.nuevoToken);
          this.userService.token = this.nuevoToken;
          console.log('Token renovado');
          return true;
        })
      );
  }

}
