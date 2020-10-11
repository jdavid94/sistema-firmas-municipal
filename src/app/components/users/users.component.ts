import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import Swal from 'sweetalert2'
import { UsersService } from './../../services/users.service';
import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  userSelected: User;

  constructor(public nav: NavbarService, public usersService: UsersService) { }

  ngOnInit(): void {
    this.nav.show();
    //This.user.documents = null // Evitar problemas al actualizar cliente y sus facturas
    this.usersService.getUsers().subscribe((resp:any) => {
      this.users = resp;
      //console.log(this.users);
    })
}

public delete(user : User){
  Swal.fire({
    title: 'Esta seguro?',
    text: `No sera posible recuperar este usuario! ${user.name} ${user.lastName}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.value) {
      this.usersService.delete(user.id).subscribe(
        resp => {
          this.users = this.users.filter(use => use !== user)
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido Eliminado.',
            'success'
          )
        }
      )
    }
  })
}
}
