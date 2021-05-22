import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token: string = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    });
    const reqClone = req.clone({
      headers,
    });

    return next.handle(reqClone).pipe(catchError(this.handleError));
    //throw new Error("Method not implemented.");
  }

  handleError(error: HttpErrorResponse) {
    console.log("Sucedio un error");
    console.warn(error);
    // $("#ProcesoAjax").hide();
    return throwError("Error Personalizado");
  }
}
