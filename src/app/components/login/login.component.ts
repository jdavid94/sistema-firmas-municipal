import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { User } from './../users/user';
import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title:string = 'Sistema de Firmas Municipal';
  title2:string = 'Ingrese al Sistema'
  user:User;

  constructor(public nav: NavbarService, private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.nav.hide();
    if (this.authService.isAuthenticated()) {
      Swal.fire({
          icon: 'info',
          title: 'Login',
          text: 'Usuario Autenticado'
      })
      this.router.navigate(['/documents']);
    }
  }

  login():void {
    //console.log(this.user);
    if(this.user.username == null || this.user.password == null){
      Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: 'Username o Password Vacios!'
      })
      return;
    }
    this.authService.login(this.user).subscribe(resp => {
      //console.log(resp);
      //let payload = JSON.parse(atob(resp.access_token.split(".")[1]));
      //console.log(payload);
      this.authService.saveUser(resp.access_token);
      this.authService.saveToken(resp.access_token);
      let user = this.authService.user;
      if (this.authService.hasRole("ROLE_ADMIN") ) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/home']);
      }
      Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: 'Usuario : ' + user.username
      })
    }, err => {
      if (err.status == 400){
        Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'Credenciales Invalidos!'
        })
      }
    });
  }

}
