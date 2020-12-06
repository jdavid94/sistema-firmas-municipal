import { Component } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DocumentsService } from './../../services/documents.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements AfterViewInit {

  public docList: any[] = [];
  public desde: string;
  public hasta: string; 

  constructor(public nav: NavbarService, public documentService: DocumentsService) { }

   
  dtOptions: any = {};
  ngOnInit(): void {
    this.nav.show();
    this.loadDocuments();
    this.dtOptions = {
      display: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,      
      language: {
        "lengthMenu": "Mostrar _MENU_ registros",
        "zeroRecords": "No se encontraron resultados",
        "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
        "sSearch": "Buscar:",
        "oPaginate": {
          "sFirst": "Primero",
          "sLast": "Último",
          "sNext": "Siguiente",
          "sPrevious": "Anterior"
        },
        "sProcessing": "Procesando...",
      },      
      responsive: "true",
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excelHtml5',
          text: '<i class="fas fa-file-excel"></i> ',
          titleAttr: 'Exportar a Excel',
          className: 'btn btn-success',
          title: 'Listado de Documentos Aprobados'
        },
        {
          extend: 'pdfHtml5',
          text: '<i class="fas fa-file-pdf"></i> ',
          titleAttr: 'Exportar a PDF',
          className: 'btn btn-danger',
          title: 'Listado de Documentos Aprobados'
        },
        {
          extend: 'print',
          text: '<i class="fa fa-print"></i> ',
          titleAttr: 'Imprimir',
          className: 'btn btn-info',
          title: 'Listado de Documentos Aprobados'
        },
      ]	        
    };
  }

  displayedColumns: string[] = ['ID', 'Area', 'Año', 'Folio', 'Tipo', 'Estado', 'Fecha'];
  dataSource: any;
  //dataSource = new MatTableDataSource<Document>(this.docList);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  ngAfterViewInit() {    
    //this.dataSource.paginator = this.paginator;
 
  }

 
  public dateChange() {
    if (this.desde !== '' && this.hasta !== '') { 
      //console.log(this.desde);
      //console.log(this.hasta);     
      this.docList = this.docList.filter(doclist => doclist.fechaCreacion >= this.desde && doclist.fechaCreacion <= this.hasta);   
      this.dataSource = new MatTableDataSource();   
      this.dataSource.data = this.docList; 
      //onsole.log(this.dataSource.data);
    }else{
      this.loadDocuments();
    }
  }

  public limpiar(){
    this.desde = '';
    this.hasta = '';
    this.loadDocuments();
  }
  
  public loadDocuments(): void {
    this.documentService.getDocuments()
    .subscribe((resp: any) => {
      this.docList = resp;
      this.docList = this.docList.filter(doclist => doclist.estado === 'Firmado y Aprobado');
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.docList;      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //console.log(this.dataSource.data);
    })
  }

}




