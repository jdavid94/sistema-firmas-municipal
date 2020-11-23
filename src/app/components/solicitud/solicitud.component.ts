import { Component, OnInit} from '@angular/core';
import { SolicitudService } from './../../services/solicitud.service';
import { Solicitud } from './models/solicitud';
import { NavbarService } from './../../services/navbar.service';
import Swal from 'sweetalert2';
import { DocumentsService } from './../../services/documents.service';
import { Document } from '../documents/models/document';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})

export class SolicitudComponent implements OnInit {

  solicitudes: Solicitud[] = [];
  constructor(public solicitudService: SolicitudService, public nav: NavbarService, public documentService: DocumentsService) { }

  ngOnInit(): void {
    this.nav.show();
    this.solicitudService.getSolicitudes().subscribe((resp:any) => {
      this.solicitudes = resp;
      //console.log(this.solicitudes);
    })
  }

  public delete(solicitud: Solicitud){
    Swal.fire({
      title: 'Esta seguro?',
      text: `No sera posible recuperar este solicitud! ${solicitud.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        let docTemp = new Document();
        docTemp = solicitud.document;
        this.solicitudService.delete(solicitud.id).subscribe(
          resp => {
            this.solicitudes = this.solicitudes.filter(sol => sol !== solicitud)
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido Eliminado.',
              'success'
            )
          }
        )
        docTemp.estado = 'Pendiente';
        docTemp.firmaDerecha = 'No Solicitada';
        docTemp.firmaIzquierda = 'No Solicitada';
        this.documentService.update(docTemp).subscribe(
          resp => {
            console.log('Doc Update');
        })
      }
    })
  }
}
