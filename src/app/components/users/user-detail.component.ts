import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from './../../services/navbar.service';
import { UsersService } from './../../services/users.service';
import { User } from './user';
import { Cargo } from './cargo';
import { Role } from './role';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public user: User = new User();
  public title = 'Detalle Usuario';
  public errors: string[];
  public cargos: Cargo[];
  public roles: Role[];

  constructor(public nav: NavbarService, public usersService: UsersService, private router: Router,
  private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.nav.show();
    this.loadUser();
    this.usersService.getCargos().subscribe((resp:any) => {
        this.cargos = resp;
    })
    this.usersService.getRoles().subscribe((resp:any) => {
        this.roles = resp;
    })
  }

  public loadUser(): void {
     this.activatedRoute.params.subscribe(params => {
       const username = params['id'];
       if (username) {
         this.usersService.getUsuario(username).subscribe(
           (resp:any) => this.user = resp)
           //console.log(this.user);
       }
     })
  }

  public create(): void {
    this.user.area = 'Municipal';
    this.user.password = '$2a$10$C3Uln5uqnzx/GswADURJGOIdBqYrly9731fnwKDaUdBkt/M3qvtLq';
    this.user.enabled = true;
    //console.log(this.user);
    this.usersService.create(this.user).subscribe(
        resp => {
          this.router.navigate(['/users'])
          Swal.fire({
              icon: 'success',
              title: 'Nuevo Usuario!',
              text: `Usuario ${resp.User.name} Creado Correctamente`
          })
        },
        err => {
          this.errors = err.error.Errors as string[];
          console.error('Cod of the error from backend: ' + err.status);
          console.error(err.error.Errors);
        }
    );
  }

  public update(): void {
    this.usersService.update(this.user).subscribe(
      resp => {
        this.router.navigate(['/users'])
        Swal.fire({
            icon: 'success',
            title: 'Usuario Actualizado!',
            text: `Usuario ${resp.User.name} Actualizado Correctamente`
        })
      },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
    )
  }

  compareRole(o1: Role, o2: Role):boolean {
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 ===null || o2 ===null || o1 ===undefined || o2 ===undefined? false: o1.tipo===o2.tipo;
  }

  compareCargo(o1: Cargo, o2: Cargo):boolean {
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 ===null || o2 ===null || o1 ===undefined || o2 ===undefined? false: o1.tipo===o2.tipo;
  }

}
