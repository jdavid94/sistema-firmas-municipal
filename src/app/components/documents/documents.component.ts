import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { DocumentsService } from './../../services/documents.service';
import { TipoDocument } from './models/tipo-document';
import { Document } from '../documents/models/document';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { User } from '../users/user';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {


  public tipos: TipoDocument[];
  public documents: Document = new Document();
  public errors: string[];
  public user: User = new User();

  constructor(public nav: NavbarService, public documentService: DocumentsService, private router: Router, public authService: AuthService, public usersService: UsersService) { }

  ngOnInit(): void {
    this.nav.show();
    this.documentService.getTipoDocument().subscribe((resp:any) => {
        this.tipos = resp;
        //console.log(this.tipos);
        //console.log(this.authService.user);
    });
    this.loadUser();
    //this.activatedRoute.params.subscribe(params => {
      //let userId = +params.get('');
    //})
  }

  public loadUser(): void {
    let userT = this.authService.user;
    //console.log('Test:' + userT.username);
    this.usersService.getUsuario(userT.username).subscribe((resp:any) => {
      this.user = resp;
      //console.log(resp);
    })
  }

  public create(): void {
  this.documents.anio = 2020;
  this.documents.area = 'Municipal';
  this.documents.estado = 'Pendiente';
  this.documents.user = this.user;
  this.documentService.create(this.documents).subscribe(
      resp => {
        this.router.navigate(['/documents'])
        Swal.fire({
            icon: 'success',
            title: 'Documento Creado con Exito!',
        })
        //this.documents = new Document();
     },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
  );
}
}
