import { Injectable } from '@angular/core';
import { Solicitud } from '../components/solicitud/models/solicitud';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private urlEndPoint: string = 'http://localhost:8081/api/solicitudes';

  constructor(private http: HttpClient) { }

  getSolicitud(id:number):Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.urlEndPoint}/${id}`);
  }

  getSolicitudes():Observable<Solicitud> {
    return this.http.get<Solicitud>(this.urlEndPoint);
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

}
