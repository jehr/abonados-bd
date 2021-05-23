import { HttpClient, HttpHeaders } from '@angular/common/http';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var $;
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: any = {};
  productImageEdit: File[];

  constructor(
    private http: HttpClient,
    private modalService: ModalService
  ) { }

  getAllProducts(): Observable<any> {
    // this.modalService.abrirModal('modalLoading');
    const url = `${environment.urlApi}abonados`;
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

  getProductById(id: string): Observable<any> {
    // this.modalService.abrirModal('modalLoading');
    const url = `${environment.urlApi}abonados/get-abonado?id=${id}`;
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

  editProduct(product: any): Observable<any> {
    const url = `${environment.urlApi}abonados/edit-abonado`;
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

  deleteProduct(id: any): Observable<any> {
    const url = `${environment.urlApi}abonados/delete-abonado`;
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
