import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { DocumentsService } from './../../services/documents.service';
import { TipoDocument } from '../documents/models/tipo-document';
import { Document } from '../documents/models/document';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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
  public searchTerm: TipoDocument;
  public show: boolean = true;
  public docPage: Document[] = []; // Para paginator
  public docPageTipo: Document[] = []; // Para paginator
  public paginador: any;
  public paginador2: any;
  public newTipo: TipoDocument;

  constructor(public nav: NavbarService, public documentService: DocumentsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.nav.show();
    this.documentService.getTipoDocument().subscribe((resp: any) => {
      this.tipos = resp;
      //console.log(this.tipos);
    });
    this.loadDocuments();  
  }

  public loadDocuments(): void {
       // this.documentService.getDocuments().subscribe((resp:any) => {
        // this.docPage = resp;
          //console.log(this.docBus)
          //let last: any = this.docBus[this.docBus.length - 1];
          //console.log(last.id + 1);
      // })
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.documentService.getDocumentPage(page).subscribe(
        resp => {
          this.docBus = resp.content; // Son documentos paginados
          this.paginador = resp;
         //console.log(this.docBus)
         //console.log(this.paginador)
        });
    });
    
  }

  buscar(termino: string) {
    //console.log(termino);
    this.documentService.buscarByFolio( termino )
      .subscribe( (data: any) => {
        if (termino === '' && this.searchTerm === undefined){
          this.loadDocuments();
          this.fdocBus = this.docBus;
        } else if (termino === '' && this.searchTerm != undefined) {
          this.activatedRoute.paramMap.subscribe(params => {
            let page: number = +params.get('page');
            if (!page) {
              page = 0;
            }
            this.documentService.getDocumentPageTipo(this.searchTerm.id, page).subscribe(
              resp => {
                this.fdocBus = resp.content;
                this.paginador2 = resp;
                //console.log(this.paginador)
              });
          });
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
        if (this.searchTerm === undefined) {
          //console.log(data[0].tipoDocumento.tipo);
          this.docBus = data;
          this.fdocBus = this.docBus;
        } else {
        let term = this.searchTerm;
        data = data.filter(doc => doc.tipoDocumento.tipo === term.tipo);
        this.docBus = data;
        this.fdocBus = this.docBus;
        }
      });
  }
  

  search(): void {
      this.show = false;
      let term = this.searchTerm;      
      if (this.searchTerm != undefined)   {
        //this.loadDocuments();
        //console.log(term);     
        //this.fdocBus = this.docBus.filter(doc => doc.tipoDocumento.tipo === term.tipo);
        this.activatedRoute.paramMap.subscribe(params => {
          let page: number = +params.get('page');
          if (!page) {
            page = 0;
          }
          this.documentService.getDocumentPageTipo(term.id, page).subscribe(
            resp => {
              this.fdocBus = resp.content;
              this.paginador2 = resp;
              //console.log(this.paginador)
            });       
        });   
        //if (this.fdocBus.length === 0) {
        //  Swal.fire({
        //    icon: 'info',
        //    title: 'No existen registros 2!',
        //  })
        //}
       
     }else{       
      this.loadDocuments();
      this.fdocBus = this.docBus;
      this.show = true;    
    }
  }

}
