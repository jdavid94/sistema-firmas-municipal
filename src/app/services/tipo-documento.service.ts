import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TipoDocument } from '../components/documents/models/tipo-document';


@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private urlEndPoint: string = 'http://localhost:8081/api/tiposDocumentos';
  //private urlEndPoint: string = URL_BACKEND + '/api/tiposDocumentos';

  constructor(private http: HttpClient) { }

  getTipoDocuments(): Observable<TipoDocument[]> {
    return this.http.get<TipoDocument[]>(this.urlEndPoint);
  }

  getTipoDocument(id: number): Observable<TipoDocument> {
    return this.http.get<TipoDocument>(`${this.urlEndPoint}/${id}`);
  }

  create(tipodocument: TipoDocument): Observable<any> {
    return this.http.post<TipoDocument>(this.urlEndPoint, tipodocument).pipe(
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

  delete(id: number): Observable<TipoDocument> {
    return this.http.delete<TipoDocument>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.message) {
          console.log(e.error.message);
        }
        return throwError(e);
      })
    );
  }
}
