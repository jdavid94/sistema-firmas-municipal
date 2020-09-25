import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { DocumentsService } from './../../services/documents.service';
import { TipoDocument } from '../documents/models/tipo-document';
import { Document } from '../documents/models/document';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public tipos: TipoDocument[];
  public docBus: any[] = [];
  public fdocBus: any[] = [];
  public documents: Document;
  searchTerm: TipoDocument;
  show: boolean = true
  constructor(public nav: NavbarService, public documentService: DocumentsService) { }

  ngOnInit(): void {
    this.nav.show();
    this.documentService.getTipoDocument().subscribe((resp:any) => {
        this.tipos = resp;
    });
    this.loadDocuments();
  }

  public loadDocuments(): void {
        this.documentService.getDocuments().subscribe((resp:any) => {
          this.docBus = resp;
          //console.log(this.documents);
        })
  }

  buscar(termino: string) {
    //console.log(termino);
    this.documentService.buscarByFolio( termino )
      .subscribe( (data: any) => {
        if (termino === ''){
          this.loadDocuments();
          this.fdocBus = this.docBus;
        }
        if (termino.length === 4 && data.length === 0){
          Swal.fire({
              icon: 'info',
              title: 'No existen registros!',
          })
        }
        if (termino.length > 4 && data.length === 0){
          Swal.fire({
              icon: 'error',
              title: 'Numeracion no Valida!',
          })
        }
        //console.log(data);
        this.docBus = data;
        this.fdocBus = this.docBus;
      });
  }

  search(): void {
      this.show = false;
      let term = this.searchTerm;
      if (this.searchTerm != undefined)   {
        this.loadDocuments();
        //console.log(term);
        this.fdocBus = this.docBus.filter(doc => doc.tipoDocumento.tipo === term.tipo);
        //console.log(this.fdocBus);
        if (this.fdocBus.length === 0 ){
          Swal.fire({
              icon: 'info',
              title: 'No existen registros!',
          })
        }
     }else{
       this.loadDocuments();
       this.fdocBus = this.docBus;
       this.show = true;
     }

  }

}
