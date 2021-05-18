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
  public docBus: any[] = [];
  public lastObj: any;
  public lastFolio: any;
  public searchTerm: TipoDocument;


  constructor(public nav: NavbarService, public documentService: DocumentsService, private router: Router, public authService: AuthService, 
    public usersService: UsersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.nav.show();
    this.documentService.getTipoDocument().subscribe((resp:any) => {
        this.tipos = resp;
        //console.log(this.tipos);
        //console.log(this.authService.user);
    });
    this.loadUser();
    this.loadDocument();
    this.loadDocuments();
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
  this.documents.anio = 2021;
  this.documents.area = 'Municipal';
  this.documents.estado = 'Pendiente';
  this.documents.user = this.user;
  this.documentService.create(this.documents).subscribe(
      resp => {
        this.router.navigate(['/documents'])
        Swal.fire({
            icon: 'success',
            title: 'Documento Creado con Exito!',
          text: `Documento ${this.PadLeft(this.lastFolio, 4)} Creado Correctamente`
        })
      this.ngOnInit();
      //console.log(resp.document.id); ,
      // text: `Documento ${resp.document.id} Creado Correctamente`
     },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
  );
  // Volvemos a llamar los arreglos.
  this.ngOnInit();
}

public update(): void {
  this.documentService.update(this.documents).subscribe(
    resp => {
      this.router.navigate(['/gestor/page', 0])
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

  public loadDocuments(): void {
    this.documentService.getDocuments().subscribe((resp: any) => {
      this.docBus = resp;
      //console.log(this.docBus)
      this.lastObj = this.docBus[this.docBus.length - 1];
      this.lastFolio = this.lastObj.id + 1
      //console.log(this.lastFolio);
    })
  }

  setFolio(): void {   
    if (this.documents.tipoDocumento != undefined && this.documents.id === undefined)  {
      this.documents.folio = this.PadLeft(this.lastFolio, 4);
    } else if (this.documents.tipoDocumento === undefined && this.documents.estado === undefined) {
      this.documents.folio = ''
    } 
    //&& this.documents.estado != 'Pendiente' if (this.documents.estado != 'Pendiente' && this.documents.tipoDocumento === undefined)
  }

  PadLeft(value, length) {
    return (value.toString().length < length) ? this.PadLeft("0" + value, length) : value;   
  }

}
