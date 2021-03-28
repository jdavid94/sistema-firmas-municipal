import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { ParametrosService } from './../../services/parametros.service';
import { CorreoService } from './../../services/correo.service';
import { TipoDocumentoService } from './../../services/tipo-documento.service';
import Swal from 'sweetalert2';
import { Parametros } from './model/parametros';
import { Correo } from './model/correo';
import { TipoDocument } from './../documents/models/tipo-document';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

  parametros: Parametros[] = [];
  correo: Correo[] = [];
  tipos: TipoDocument[]; 
  seleccionado: TipoDocument;
  tiposDocuments: TipoDocument = new TipoDocument();
  errors: string[];
  form: FormGroup;

  constructor(public nav: NavbarService, public parametrosService: ParametrosService, public correoService: CorreoService, public tipoService: TipoDocumentoService) { }

  ngOnInit(): void {
    this.nav.show();  
    this.parametrosService.getParametros().subscribe((resp: any) => {
      this.parametros = resp;
      //console.log(this.parametros); 
    })
    this.correoService.getCorreo().subscribe((resp: any) => {
      this.correo = resp;
      //console.log(this.correo); 
    })
    this.loadTipoDocumento();
  }

  public loadTipoDocumento(){
    this.tipoService.getTipoDocuments().subscribe((resp: any) => {
      this.tipos = resp;
      console.log(this.tipos);
    })
  }

  public update(): void {
    this.parametrosService.update(this.parametros[0]).subscribe(
      resp => {
       Swal.fire({
          icon: 'success',
          title: 'Parametros Actualizados!',
          text: `Datos Servidor de Correo Actualizados`
        })
      },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
    )
  }

  public update2(): void {
    this.correoService.update(this.correo[0]).subscribe(
      resp => {
        Swal.fire({
          icon: 'success',
          title: 'Correo Actualizado!',
          text: `Datos de Correo Actualizados`
        })
      },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
    )
  }

  public create(): void { 
    this.tipoService.create(this.tiposDocuments).subscribe(
      resp => {    
        this.loadTipoDocumento();   
        Swal.fire({
          icon: 'success',
          title: 'Tipo Documento Creado con Exito!',
        })
      },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
    );
  }

  public delete(tipoDocument: TipoDocument) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `No sera posible recuperar este Tipo Documento! ${tipoDocument.tipo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.tipoService.delete(tipoDocument.id).subscribe(
          resp => {
            this.tipos = this.tipos.filter(tip => tip !== tipoDocument)
            Swal.fire(
              'Eliminado!',
              'El Tipo Documento ha sido Eliminado.',
              'success'
            )
          },
          err => {
            this.errors = err.error.Errors as string[];
            console.error('Cod of the error from backend: ' + err.status);
            console.error(err.error.Errors);
            Swal.fire(
              'Tipo Documento con Relación!',
              'Documentos y Solicitudes Asociadas',
              'error'
            )
          }
        )
      }
    })
  }
  
}
