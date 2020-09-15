import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Document } from '../components/documents/models/document';
import { TipoDocument } from '../components/documents/models/tipo-document';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private urlEndPoint: string = 'http://localhost:8081/api/documentos';

  constructor(private http: HttpClient) { }

  getTipoDocument(): Observable<TipoDocument[]> {
    return this.http.get<TipoDocument[]>(this.urlEndPoint +'/tipos');
  }

  getDocument(id:number):Observable<Document> {
    return this.http.get<Document>(`${this.urlEndPoint}/${id}`);
  }

  getDocuments():Observable<Document> {
    return this.http.get<Document>(this.urlEndPoint);
  }

  create(document: Document) : Observable<any> {
    return this.http.post<Document>(this.urlEndPoint, document).pipe(
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

  buscarByFolio( termino: string){
    return this.http.get(`${this.urlEndPoint}/buscar?folio=${termino}`);      
    }
}
