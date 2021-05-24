import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AbonoService {

  constructor(private http: HttpClient, private userService: UserService) { }

  abonarUsuario(paquete: any): Observable<any> {
    const user: any = this.userService.getUserLogged();
    const token: string = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const data = {
      fk_usuario: user.id,
      fk_paquete: paquete._id
    }
    const url = `${environment.urlApi}abonados/add-abonado`;
    return this.http.post(url, data, {headers}).pipe(
      map(
        (res: any) => {
          return res;
        }
      ),
      catchError(
        (error: any) => {
          return error;
        }
      )
    );
  }

  getAllAbonosById(): Observable<any> {
    const user: any = this.userService.getUserLogged();
    const token: string = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.urlApi}abonados/abonos-user?id=${user.id}`;
    return this.http.get(url, {headers}).pipe(
      map(
        (res: any) => {
          return res;
        }
      ),
      catchError(
        (error: any) => {
          return error;
        }
      )
    );
  }

  
}
