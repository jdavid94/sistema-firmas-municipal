import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './../../services/documents.service';
import { NavbarService } from './../../services/navbar.service';
import { Document } from '../documents/models/document';
import { Solicitud } from '../solicitud/models/solicitud';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { SolicitudService } from './../../services/solicitud.service';
import { User } from '../users/user';
import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {


  public document: Document;
  public solicitudF: Solicitud;
  public solicitud: Solicitud = new Solicitud();
  titulo: string = 'Documento';
  users: User[];
  seleccionado: User;
  public errors: string[];
  public firma : string = "../../../assets/img/firma.png";
  public validador: boolean = false;
  public validador2: boolean = false;
  public user: User = new User();
  public newID: number;


  constructor(public nav: NavbarService,
    public authService: AuthService,
    public documentService: DocumentsService, private activatedRoute: ActivatedRoute, public usersService: UsersService,
                          public solicitudService: SolicitudService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.nav.show();
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.documentService.getDocument(id).subscribe(resp => {
        this.document = resp;
      });
      this.solicitudService.getSolicitud(id).subscribe(resp => {
        this.solicitudF = resp;
        //console.log(this.solicitudF);
        this.newID = +this.solicitudF.document.id;
        if (this.newID != undefined) {
          this.documentService.getDocument(this.newID).subscribe(resp => {
            this.document = resp;
          });
        }
      });
    });
    this.loadUsers();
    this.loadUser();
  }

  public loadUsers(): void {
        this.usersService.getUsers().subscribe((resp:any) => {
          this.users = resp;
          //console.log(this.users);
        })
  }

  public loadUser(): void {
    let userT = this.authService.user;
    //console.log('Test:' + userT.username);
    this.usersService.getUsuario(userT.username).subscribe((resp:any) => {
      this.user = resp;
      //console.log(resp);
    })
  }

  public selectUser() {
    if (this.document.firmaIzquierda === 'No Solicitada') {
      this.document.firmaIzquierda = this.seleccionado.name + ' ' + this.seleccionado.lastName;
      Swal.fire("Usuario Asociado!",
      "Usuario " + this.seleccionado.name + ' ' + this.seleccionado.lastName + " Asociado a Documento",
      "success");
    }else{
      this.document.firmaDerecha = this.seleccionado.name + ' ' + this.seleccionado.lastName;
      Swal.fire("Usuario Asociado!",
      "Usuario " + this.seleccionado.name + ' ' + this.seleccionado.lastName + " Asociado a Documento",
      "success");
    }
    //console.log(this.seleccionado.name + ' ' + this.seleccionado.lastName);
  }

  public solicitar(): void {
    //console.log(this.document);
    this.document.estado = "Espera Firma";
    this.documentService.solicitar(this.document).subscribe(
      resp => {
        console.log("Documento Actualizado")
      },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
    );
    this.solicitud.area = this.document.area;
    this.solicitud.anio = this.document.anio;
    this.solicitud.folio = this.document.folio;
    this.solicitud.tipoDocumento = this.document.tipoDocumento.tipo;
    this.solicitud.estado = "Solicitado";
    this.solicitud.firmaIzquierda = this.document.firmaIzquierda;
    this.solicitud.firmaDerecha = this.document.firmaDerecha;
    this.solicitud.firmaIzquierdaB = false;
    this.solicitud.fimraDerechaB = false;
    this.solicitud.document = this.document
    this.solicitud.solicitante = this.user.name + ' ' + this.user.lastName
    this.solicitudService.create(this.solicitud).subscribe(
      resp => {
        Swal.fire({
            icon: 'success',
            title: 'Solicitud Enviada!',
            text: 'Documento'
        })
      },
      err => {
        this.errors = err.error.Errors as string[];
        //console.error('Cod of the error from backend: ' + err.status);
        //console.error(err.error.Errors);
      }
    )
  }

  public firmarDocumento(): void {
    this.document.estado = "Firmado y Aprobado"
    this.documentService.solicitar(this.document).subscribe(
      resp => {
        //console.log("Documento Actualizado")
      },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
    );
    this.solicitudF.estado = "Firmado y Aprobado";
    this.solicitudF.firmaIzquierdaB = true;
    this.solicitudService.update(this.solicitudF).subscribe(
      resp => {
        //console.log(this.solicitudF);
        Swal.fire({
            icon: 'success',
            title: 'Documento Firmado con Exito!',
            text: 'Documento ' + this.document.anio + '-' + this.document.folio + ' Aprobado'
        })
      },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
    );
  }

  async showPdfnoFirmado() {
  let fecha = this.document.fechaCreacion
  let newDate = this.datePipe.transform(fecha,"longDate");
  let docDefinition = {
    content: [
      {
        image: await this.getBase64ImageFromURL("../../../assets/img/municipalidad.png"),
        width: 100,
        height: 100,
        margin: [0, 0, 0, 0]
      },
      {
        text: 'Documento Folio N° ' + this.document.anio + '-' + this.document.folio ,
        bold: true,
        fontSize: 18,
        alignment: 'center',
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Ilustre Municipalidad De Concón',
        alignment: 'center',
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Viña del Mar : ' + newDate,
        margin: [0, 0, 0, 5]
      },
      {
         text: 'Area : ' + this.document.area,
         margin: [0, 0, 0, 5]
       },
       {
         text: 'Materia : ' + this.document.tipoDocumento.tipo,
         margin: [0, 0, 0, 20]
       },
      {
        columns: [
          [
          {
            text: 'Glosa del Documento',
            margin: [0, 0, 0, 10]
          },
          {
            text: this.document.glosa,
            margin: [0, 0, 0, 5]
          }
          ],
          []
        ]
      },
      {
        text: 'ANÓTESE; COMUNÍQUESE Y ARCHIVESE.',
        margin: [0, 180, 0, 0]
      },
      {
        columns: [
          [
            {
              text: '______________________' + '\n' + this.document.firmaIzquierda + '\n' + 'Director Municipal',
              margin: [20, 200, 0, 0],
              alignment: 'center'
          }],
          [{
              text: '______________________' + '\n' + this.document.firmaDerecha + '\n' + 'Alcalde',
              margin: [30, 200, 0, 0],
              alignment: 'center'
          }]
        ]
      },
    ],
    styles: {
      name: {
        fontSize: 16,
        bold: true
      }
    }
  };
  pdfMake.createPdf(docDefinition).open();
}

async showPdfFirmado() {
let fecha = this.document.fechaCreacion
let newDate = this.datePipe.transform(fecha,"longDate");
let dateTimeFirma = this.datePipe.transform(new Date(),"medium");
let docDefinition = {
  content: [
    {
      image: await this.getBase64ImageFromURL("../../../assets/img/municipalidad.png"),
      width: 100,
      height: 100,
      margin: [0, 0, 0, 0]
    },
    {
      text: 'Documento Folio N° ' + this.document.anio + '-' + this.document.folio ,
      bold: true,
      fontSize: 18,
      alignment: 'center',
      margin: [0, 0, 0, 15]
    },
    {
      text: 'Ilustre Municipalidad De Concón',
      alignment: 'center',
      margin: [0, 0, 0, 15]
    },
    {
      text: 'Viña del Mar : ' + newDate,
      margin: [0, 0, 0, 5]
    },
    {
       text: 'Area : ' + this.document.area,
       margin: [0, 0, 0, 5]
     },
     {
       text: 'Materia : ' + this.document.tipoDocumento.tipo,
       margin: [0, 0, 0, 20]
     },
    {
      columns: [
        [
        {
          text: 'Glosa del Documento',
          margin: [0, 0, 0, 10]
        },
        {
          text: this.document.glosa,
          margin: [0, 0, 0, 5]
        }
        ],
        []
      ]
    },
    {
      text: 'ANÓTESE; COMUNÍQUESE Y ARCHIVESE.',
      margin: [0, 180, 0, 0]
    },
    {
      columns: [
        [
          {image: await this.getBase64ImageFromURL(this.firma),
          fit: [120, 120],
          margin: [20, 90, 0, 0],
          alignment: 'center'
        },{
          text: 'Firmado: '+ dateTimeFirma + '\n' + '______________________' + '\n' + this.document.firmaIzquierda + '\n' + 'Director Municipal',
          margin: [20, 0, 0, 0],
          alignment: 'center'}
        ],
        [{
            text: '______________________' + '\n' + this.document.firmaDerecha + '\n' + 'Alcalde',
            margin: [30, 200, 0, 0],
            alignment: 'center'
        }]
      ]
    },
  ],
  styles: {
    name: {
      fontSize: 16,
      bold: true
    }
  }
};
pdfMake.createPdf(docDefinition).open();
}


  getBase64ImageFromURL(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = error => {
      reject(error);
    };

    img.src = url;
  });
}

}
