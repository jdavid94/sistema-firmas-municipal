import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Parametros } from '../components/parametros/model/parametros';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private urlEndPoint: string = 'http://localhost:8081/api/parametros';
  //private urlEndPoint: string = URL_BACKEND + '/api/documentos';

  constructor(private http: HttpClient) { }

  getParametros(): Observable<Parametros> {
    return this.http.get<Parametros>(this.urlEndPoint);
  }

  getParametro(id: number): Observable<Parametros> {
    return this.http.get<Parametros>(`${this.urlEndPoint}/${id}`);
  }

  create(parametro: Parametros): Observable<any> {
    return this.http.post<Parametros>(this.urlEndPoint, parametro).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.message) {
          console.log(e.error.message);
        }
        return throwError(e);
      })
    );
  }

  update(parametro: Parametros): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${parametro.id}`, parametro).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.message) {
          console.log(e.error.message);
        }
        return throwError(e);
      })
    );
  }
}
