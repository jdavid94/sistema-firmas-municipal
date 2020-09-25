import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/users/user';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private urlEndPoint: string = 'http://localhost:8081/api/usuarios';

  constructor(private http: HttpClient) { }


  getUsers():Observable<User> {
      return this.http.get<User>(this.urlEndPoint);
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
}
