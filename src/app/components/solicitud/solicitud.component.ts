import { Component, OnInit} from '@angular/core';
import { SolicitudService } from './../../services/solicitud.service';
import { Solicitud } from './models/solicitud';
import { NavbarService } from './../../services/navbar.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})

export class SolicitudComponent implements OnInit {

  solicitudes: Solicitud[] = [];
  constructor(public solicitudService: SolicitudService, public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
    this.solicitudService.getSolicitudes().subscribe((resp:any) => {
      this.solicitudes = resp;
      //console.log(this.solicitudes);
    })
  }
}
