import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { UsersService } from './../../services/users.service';
import { User } from './../users/user';
import Swal from 'sweetalert2'
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  public user: User = new User();
  public title = 'Datos Usuario';
  public errors: string[];
  form: FormGroup;

  constructor(public nav: NavbarService, public usersService: UsersService, public authService: AuthService) { }
  

  ngOnInit(): void {
    this.nav.show();
    this.loadUser();
  }

  public loadUser(): void {
    let userT = this.authService.user;
    this.usersService.getUsuario(userT.username).subscribe((resp: any) => {
      this.user = resp;
    })
  }

  public update(): void {
    this.usersService.update(this.user).subscribe(
      resp => {   
        Swal.fire({
          icon: 'success',
          title: 'Datos Actualizados!',
          text: `Perfil ${resp.User.name} Actualizado Correctamente`
        })
      },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
    )
  }

}
