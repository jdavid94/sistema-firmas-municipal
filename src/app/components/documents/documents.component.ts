import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
  }

}
