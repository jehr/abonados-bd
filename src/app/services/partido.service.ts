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

  editPartido(product: any): Observable<any> {
    const url = `${environment.urlApi}partidos/edit-partido`;
    const token: string = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const fd = new FormData();
    fd.append('name', product.name);
    fd.append('description', product.description);
    fd.append('createdAt', product.createdAt);
    fd.append('category', product.category);
    fd.append('stock', product.stock);
    fd.append('price', product.price);
    fd.append('id', product.id);

    if (product.product) {
      for (let img of product.product) {
        fd.append('image', img);
      }
    }

    // this.modalService.abrirModal('modalLoading');

    return this.http.post(url, fd, {headers}).pipe(
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

  deletePartido(id: any): Observable<any> {
    const url = `${environment.urlApi}partidos/delete-partido`;
    const token: string = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // this.modalService.abrirModal('modalLoading');
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
