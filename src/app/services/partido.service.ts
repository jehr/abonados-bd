import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  product: any = {};
  productImageEdit: File[];

  constructor(private http: HttpClient,
    private modalService: ModalService) { }

  getAllPartidos(): Observable<any> {
    const url = `${environment.urlApi}partidos`;
    return this.http.get(url).pipe(
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

  getPartidoById(id: string): Observable<any> {
    // this.modalService.abrirModal('modalLoading');
    const url = `${environment.urlApi}partidos/get-partido?id=${id}`;
    return this.http.get(url).pipe(
      map(
        (res: any) => {
          // this.modalService.cerarModal('modalLoading');
          return res;
        }
      ),
      catchError(
        (error: any) => {
          // this.modalService.cerarModal('modalLoading');
          return error;
        }
      )
    );
  }

  sendPartido(partido: any): Observable<any> {
    const url = `${environment.urlApi}partidos/add-partido`;
    const token: string = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(url, partido, { headers }).pipe(
      map(
        (res: any) => {
          // this.modalService.cerarModal('modalLoading');
          return res;
        }
      ),
      catchError(
        (error: any) => {
          // this.modalService.cerarModal('modalLoading');
          return error;
        }
      )
    );
  }

  editPartido(partido: any): Observable<any> {
    const url = `${environment.urlApi}partidos/edit-partido`;
    const token: string = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(url, partido, {headers}).pipe(
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

  deletePartido(id: any): Observable<any> {
    const url = `${environment.urlApi}partidos/delete-partido`;
    const token: string = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // this.modalService.abrirModal('modalLoading');
    console.log('id :>> ', id);

    return this.http.post(url, {id}, {headers}).pipe(
      map(
        (res: any) => {
          // this.modalService.cerarModal('modalLoading');
          return res;
        }
      ),
      catchError(
        (error: any) => {
          // this.modalService.cerarModal('modalLoading');
          return error;
        }
      )
    );
  }
}
