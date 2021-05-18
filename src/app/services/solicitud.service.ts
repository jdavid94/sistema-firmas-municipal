import { Injectable } from '@angular/core';
import { Solicitud } from '../components/solicitud/models/solicitud';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private urlEndPoint: string = 'http://localhost:8081/api/solicitudes';
  //private urlEndPoint: string = URL_BACKEND + '/api/solicitudes';

  constructor(private http: HttpClient) { }

  getSolicitud(id:number):Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.urlEndPoint}/${id}`);
  }

  getSolicitudes():Observable<Solicitud> {
    return this.http.get<Solicitud>(this.urlEndPoint);
  }

  getSolicitudesPage(page: number): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + '/page/' + page);
  }

  create(solicitud: Solicitud) : Observable<any> {
    return this.http.post<Solicitud>(this.urlEndPoint, solicitud).pipe(
      catchError(e => {
        if(e.status==400){
            return throwError(e);
        }
        if (e.error.message){
          console.log(e.error.message);
        }
        return throwError(e);
      })
    );
  }

  update(solicitud: Solicitud): Observable<any> {
      return this.http.put<any>(`${this.urlEndPoint}/${solicitud.id}`, solicitud).pipe(
        catchError(e => {
          if(e.status==400){
              return throwError(e);
          }
          if (e.error.message){
            console.log(e.error.message);
          }
          return throwError(e);
        })
      );
    }

    delete(id: number): Observable<Solicitud> {
         return this.http.delete<Solicitud>(`${this.urlEndPoint}/${id}`).pipe(
           catchError(e => {
             if (e.error.message){
               console.log(e.error.message);
             }
             return throwError(e);
           })
         );
     }

}
