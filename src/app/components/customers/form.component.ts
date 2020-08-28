import { Component, OnInit } from '@angular/core';
import { Customers } from './customers';
import { Region } from './region';
import { CustomerService } from './../../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public customer: Customers = new Customers();
  public title = 'Create Customers';
  public errors: string[];
  public regions: Region[];

  constructor(private customerService: CustomerService, private router: Router,
  private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadCustomer();
    this.customerService.getRegions().subscribe((resp:any) => {
        this.regions = resp;
    })
  }

  public loadCustomer(): void {
     this.activatedRoute.params.subscribe(params => {
       let id = params['id'];
       if (id) {
         this.customerService.getCustomers(id).subscribe(
           (resp:any) => this.customer = resp)
       }
     })
  }


  public create(): void {
    this.customerService.create(this.customer).subscribe(
        resp => {
          this.router.navigate(['/customers'])
          Swal.fire({
              icon: 'success',
              title: 'New Customer!',
              text: `Customer ${resp.customer.name} Successfully Created`
          })
        },
        err => {
          this.errors = err.error.Errors as string[];
          console.error('Cod of the error from backend: ' + err.status);
          console.error(err.error.Errors);
        }
    );
  }

  public update(): void {
    console.log(this.customer);
    this.customerService.update(this.customer).subscribe(
      resp => {
        this.router.navigate(['/customers'])
        Swal.fire({
            icon: 'success',
            title: 'Customer Updated!',
            text: `Customer ${resp.customer.name} Successfully Updated`
        })
      },
      err => {
        this.errors = err.error.Errors as string[];
        console.error('Cod of the error from backend: ' + err.status);
        console.error(err.error.Errors);
      }
    )
  }

  compareRegion(o1: Region, o2: Region):boolean {
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 ===null || o2 ===null || o1 ===undefined || o2 ===undefined? false: o1.id===o2.id;
  }

}
