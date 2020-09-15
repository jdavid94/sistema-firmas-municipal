import { Document } from './../documents/models/document';
import { Cargo } from './cargo';

export class User {
  id:number;
  username: string;
  password: string;
  name: string;
  lastName: string;
  userRut: string;
  email: string;
  cargo: Cargo;
  roles: string[]=[];
  documents: Document[]=[];
}
