import { TipoDocument } from './tipo-document';
import { User } from '../../users/user';

export class Document {
  id: number;
  area: string;
  anio: number;
  folio: string;
  glosa: string;
  tipoDocumento: TipoDocument;
  fechaCreacion: string;
  firmaIzquierda: string;
  firmaDerecha: string;
  estado: string;
  user: User;
}
