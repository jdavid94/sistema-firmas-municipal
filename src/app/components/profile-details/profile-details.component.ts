import { Component, OnInit, Input } from '@angular/core';
import { Customers } from '../customers/customers';
import { CustomerService } from './../../services/customer.service';
import Swal from 'sweetalert2'
import {HttpEventType} from '@angular/common/http';
import { ModalService } from './../../services/modal.service';
import { NavbarService } from './../../services/navbar.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {


  @Input() customer: Customers;
  title: string = "Customer Detail Profile"
  private photoSelected: File;
  progress:number = 0;

  constructor(private customerService: CustomerService,
    public modalService: ModalService, public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
  }

  selectedPhoto(event:any) {
    this.photoSelected = event.target.files[0];
    this.progress = 0;
    console.log(this.photoSelected);
    if (this.photoSelected.type.indexOf('image') < 0){
      Swal.fire({
          icon: 'error',
          title: 'File must be a Image!'
      });
      this.photoSelected = null;
    }
  }

  loadPhoto() {
    if (!this.photoSelected){
      Swal.fire({
          icon: 'error',
          title: 'Must selected a Picture!'
      });
    }else {
      this.customerService.loadPhoto(this.photoSelected, this.customer.id)
        .subscribe(resp => {
          if(resp.type === HttpEventType.UploadProgress){
            this.progress = Math.round((resp.loaded/resp.total)*100);
          } else if (resp.type === HttpEventType.Response){
            let response:any = resp.body;
            this.customer = response.customer as Customers;
            this.modalService.notificatedUpload.emit(this.customer);
            Swal.fire({
                icon: 'success',
                title: 'Picture Load Successfully!'
            });
          }
        });
    }
  }

  closeModal(){
    this.modalService.closeModal();
    this.photoSelected = null;
    this.progress = 0;
  }
}
