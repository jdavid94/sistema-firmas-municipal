import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Correo } from '../components/parametros/model/correo';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private urlEndPoint: string = 'http://localhost:8081/api/correo';
  //private urlEndPoint: string = URL_BACKEND + '/api/correo';

  constructor(private http: HttpClient) { }

  getCorreo(): Observable<Correo> {
    return this.http.get<Correo>(this.urlEndPoint);
  }

  create(correo: Correo): Observable<any> {
    return this.http.post<Correo>(this.urlEndPoint, correo).pipe(
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

  update(correo: Correo): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${correo.id}`, correo).pipe(
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
