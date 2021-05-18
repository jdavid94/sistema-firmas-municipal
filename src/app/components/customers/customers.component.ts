import { Component, OnInit } from '@angular/core';
import { Customers } from './customers';
import { CustomerService } from './../../services/customer.service';
import { ModalService } from './../../services/modal.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from './../../services/navbar.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  customers: Customers[] = [];
  customerSelected: Customers;
  paginador: any;
  constructor(private customerService: CustomerService,
    private activatedRoute: ActivatedRoute, public modalService: ModalService, public nav: NavbarService) { }

ngOnInit(): void {
  this.nav.show();
  this.activatedRoute.paramMap.subscribe(params => {
    let page: number = +params.get('page');
    if (!page) {
      page = 0;
    }
    this.customerService.getCustomer(page).subscribe(
      resp => {
        this.customers = resp.content;
        this.paginador = resp;
        //console.log(this.customers)
        //console.log(this.paginador)
      });
  });
  this.modalService.notificatedUpload.subscribe((resp:any) => {
    this.customers = this.customers.map(originalCustomer => {
      if (resp.id == originalCustomer.id){
        originalCustomer.photo = resp.photo;
      }
      return originalCustomer;
    })
  })
}

  public delete(customer : Customers){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this customer! ${customer.name} ${customer.lastName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.customerService.delete(customer.id).subscribe(
          resp => {
            this.customers = this.customers.filter(cust => cust !== customer)
            Swal.fire(
              'Deleted!',
              'Your Customer has been deleted.',
              'success'
            )
          }
        )
      }
    })
  }

  openModal(customer: Customers) {
    this.customerSelected = customer;
    this.modalService.openModal();
  }

}
