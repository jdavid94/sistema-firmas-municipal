import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modal:boolean = false;
  private _notificatedUpload = new EventEmitter<any>();

  constructor() { }

  get notificatedUpload(): EventEmitter<any> {
    return this._notificatedUpload;
  }

  openModal(){
    this.modal = true;
  }

  closeModal(){
    this.modal = false;
  }
}
