import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { DocumentsService } from './../../services/documents.service';
import { TipoDocument } from './models/tipo-document';
import { Document } from '../documents/models/document';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UsersService } from './../../services/users.service';
import { User } from '../users/user';
import Swal from 'sweetalert2';


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

  constructor(public nav: NavbarService, public documentService: DocumentsService, private router: Router, public authService: AuthService, public usersService: UsersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.nav.show();
    this.documentService.getTipoDocument().subscribe((resp:any) => {
        this.tipos = resp;
        //console.log(this.tipos);
        //console.log(this.authService.user);
    });
    this.loadUser();
    this.loadDocument();
  }

  public loadUser(): void {
    let userT = this.authService.user;
    this.usersService.getUsuario(userT.username).subscribe((resp:any) => {
      this.user = resp;
    })
  }

  public loadDocument(): void {
     this.activatedRoute.params.subscribe(params => {
       const id = params['id'];
       if (id) {
         this.documentService.getDocument(id).subscribe(
            (resp:any) => this.documents = resp)
       }
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
     },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
  );
}

public update(): void {
  this.documentService.update(this.documents).subscribe(
    resp => {
      this.router.navigate(['/gestor'])
      Swal.fire({
          icon: 'success',
          title: 'Documento Actualizado!',
          text: `Documento Actualizado correctamente`
      })
    },
    err => {
      this.errors = err.error.Errors as string[];
      console.error('Cod of the error from backend: ' + err.status);
      console.error(err.error.Errors);
    }
  )
}

compareTipo(o1: Document, o2: Document):boolean {
  if(o1 === undefined && o2 === undefined){
    return true;
  }
  return o1 ===null || o2 ===null || o1 ===undefined || o2 ===undefined? false: o1.id===o2.id;
}
}
