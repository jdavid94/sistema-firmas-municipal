import { Injectable } from '@angular/core';
//import { formatDate, DatePipe } from '@angular/common';
//import { CUSTOMERS } from './../components/customers/customers.json';
import { Customers } from './../components/customers/customers';
import { Region } from './../components/customers/region';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private urlEndPoint:string = 'http://localhost:8081/api/customers';
  //private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http: HttpClient, private router: Router) { }

  //private addAuthorizationHeader(){
    //let token = this.authService.token;
    //if (token != null){
      //return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    //}
    //return this.httpHeaders;
  //}

  //private isNoAuthorized(e): boolean {
    //if(e.status==401) {
      //if (this.authService.isAuthenticated()){
        //this.authService.logout();
    //  }
      //this.router.navigate(['/login']);
      //return true;
    //}
    //if(e.status==403 ) {
      //Swal.fire({
        //  icon: 'warning',
          //title: 'Acceso Denegado!',
          //text: 'Necesita Permisos Administrador'
      //})
      //this.router.navigate(['/customers']);
      //return true;
    //}
    //return false;
  //}

  getCustomer(page: number): Observable<any> {
    //return of(CUSTOMERS);
    return this.http.get<any>(this.urlEndPoint+'/page/'+page);
  }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint +'/regions');
  }

  create(customer: Customers) : Observable<any> {
    return this.http.post<Customers>(this.urlEndPoint, customer).pipe(
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

  getCustomers(id: number): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.message){
          this.router.navigate(['/customers']);
          console.log(e.error.message);
        }
        console.log(e.error.message);
        return throwError(e);
      })
    );
  }

  update(customer: Customers): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${customer.id}`, customer).pipe(
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

  delete(id: number): Observable<Customers> {
    return this.http.delete<Customers>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.message){
          console.log(e.error.message);
        }
        return throwError(e);
      })
    );
  }

  loadPhoto(file: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    //let httpHeaders = new HttpHeaders();
    //let token = this.authService.token;
    //if (token != null){
      //httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    //}
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    //  headers: httpHeaders
    });
    return this.http.request(req);
  }



}
