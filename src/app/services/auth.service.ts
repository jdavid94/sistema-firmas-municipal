import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../components/users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;

  constructor(private http: HttpClient) { }

 //Verificamos si existe la session de usuario o no
  public get user(): User {
    if (this._user != null){
      return this._user;
    }else if(this._user == null && sessionStorage.getItem('user') != null){
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

//Verificamos si existe un token de usuario
  public get token(): string {
    if (this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(user:User):Observable<any> {
    const urlEndPoint = 'http://localhost:8081/oauth/token';
    const credentials = btoa('angularapp' + ':' + '12345'); //Para codificar btoa
    const httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization':'Basic ' + credentials});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders });
  }

  saveUser (accessToken: string): void {
    let payload = this.getDataToken(accessToken);
    this._user = new User();
    this._user.name = payload.name;
    this._user.lastName = payload.lastName;
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    this._user.userRut = payload.userRut;
    this._user.cargo = payload.cargo;
    this._user.roles = payload.authorities;
    //Guardar en el Session Store
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken (accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);

  }

  getDataToken(accessToken: string):any {
    if (accessToken != null ){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  //Verificamos si esta autenticado
  isAuthenticated(): boolean {
    let payload = this.getDataToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean{
    if(this.user.roles.includes(role)){
      return true;
    }
    return false;
  }

//Metodo de cerrar sesion
  logout():void {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }


}
