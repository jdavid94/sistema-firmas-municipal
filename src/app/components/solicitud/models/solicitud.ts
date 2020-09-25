import { Document } from '../../documents/models/document';

export class Solicitud {
  id: number;
  area: string;
  anio: number;
  folio: string;
  tipoDocumento: string;
  fechaIngreso: string;
  firmaIzquierda: string;
  firmaIzquierdaB: boolean;
  firmaDerecha: string;
  fimraDerechaB: boolean;
  solicitante: string;
  estado: string;
  document: Document;
}
