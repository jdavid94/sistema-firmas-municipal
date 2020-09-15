import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './../../services/documents.service';
import { NavbarService } from './../../services/navbar.service';
import { Document } from '../documents/models/document';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {


  document: Document;
  titulo: string = 'Documento';

  constructor(public nav: NavbarService,
    public documentService: DocumentsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.nav.show();
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.documentService.getDocument(id).subscribe(resp => {
        this.document = resp;
      });
    });
  }

}
