import { Document } from './../documents/models/document';
import { Cargo } from './cargo';
//import { Role } from './Role';

export class User {
  id:number;
  area:string;
  username: string;
  password: string;
  enabled: boolean
  name: string;
  lastName: string;
  userRut: string;
  email: string;
  cargo: Cargo;
  //roles: Role[]=[];
  roles: string[]=[];
  documents: Document[]=[];
}
