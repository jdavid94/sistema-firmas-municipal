import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { DocumentsService } from './../../services/documents.service';
import { Document } from '../documents/models/document';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestor-documentos',
  templateUrl: './gestor-documentos.component.html',
  styleUrls: ['./gestor-documentos.component.css']
})
export class GestorDocumentosComponent implements OnInit {

  documents: Document[];
  docSelected: Document;

  constructor(public nav: NavbarService, public documentService: DocumentsService) { }

  ngOnInit(): void {
    this.nav.show();
    this.documentService.getDocuments().subscribe((resp:any) => {
      this.documents = resp;
      //console.log(this.documents);
    })
  }

  public delete(document : Document){
    Swal.fire({
      title: 'Esta seguro?',
      text: `No sera posible recuperar este documento! ${document.anio} - ${document.folio}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.documentService.delete(document.id).subscribe(
          resp => {
            this.documents = this.documents.filter(doc => doc !== document)
            Swal.fire(
              'Eliminado!',
              'El Documento ha sido Eliminado.',
              'success'
            )
          }
        )
      }
    })
  }

}
