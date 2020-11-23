import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/users/user';
import { Cargo } from '../components/users/cargo';
import { Role } from '../components/users/role';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private urlEndPoint: string = 'http://localhost:8081/api/usuarios';
  //private urlEndPoint: string = URL_BACKEND + '/api/usuarios';

  constructor(private http: HttpClient) { }


  getUsers():Observable<User> {
      return this.http.get<User>(this.urlEndPoint);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.urlEndPoint +'/roles');
  }

  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.urlEndPoint +'/cargos');
  }

  getUsuario(username: string): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/${username}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.message){
          console.log(e.error.message);
        }
        console.log(e.error.message);
        return throwError(e);
      })
    );
  }

  create(user: User) : Observable<any> {
    return this.http.post<User>(this.urlEndPoint, user).pipe(
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

  update(user: User): Observable<any> {
    return this.http.put<User>(`${this.urlEndPoint}/${user.id}`, user).pipe(
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

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.message){
          console.log(e.error.message);
        }
        return throwError(e);
      })
    );
  }
}
