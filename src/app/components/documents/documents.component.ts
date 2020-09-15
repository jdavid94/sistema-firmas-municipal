import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { DocumentsService } from './../../services/documents.service';
import { TipoDocument } from './models/tipo-document';
import { Document } from '../documents/models/document';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {


  public tipos: TipoDocument[];
  public documents: Document = new Document();
  public errors: string[];


  constructor(public nav: NavbarService, public documentService: DocumentsService, private router: Router) { }

  ngOnInit(): void {
    this.nav.show();
    this.documentService.getTipoDocument().subscribe((resp:any) => {
        this.tipos = resp;
        console.log(this.tipos);
    });
    //this.activatedRoute.params.subscribe(params => {
      //let userId = +params.get('');
    //})
  }

  public create(): void {
  this.documents.anio = 2020;
  this.documents.area = 'Municipal';
  this.documents.estado = 'Pendiente';
  this.documentService.create(this.documents).subscribe(
      resp => {
        this.router.navigate(['/documents'])
        Swal.fire({
            icon: 'success',
            title: 'Documento Creado con Exito!',
        })
        this.documents = new Document();
     },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
  );
}
}
