import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  product: any = {};
  productImageEdit: File[];
  paqueteSelected: any = {};

  constructor(private http: HttpClient,
    private modalService: ModalService) { }

  getAllPaquetes(): Observable<any> {
    const url = `${environment.urlApi}paquetes`;
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

  getPaqueteById(id: string): Observable<any> {
    // this.modalService.abrirModal('modalLoading');
    const url = `${environment.urlApi}paquetes/get-paquete?id=${id}`;
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

  sendPaquete(paquete: any): Observable<any> {
    const url = `${environment.urlApi}paquetes/add-paquete`;
    const token: string = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(url, paquete, { headers }).pipe(
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

  editPaquete(product: any): Observable<any> {
    const url = `${environment.urlApi}paquetes/edit-paquete`;
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

  deletePaquete(id: any): Observable<any> {
    const url = `${environment.urlApi}paquetes/delete-paquete`;
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
