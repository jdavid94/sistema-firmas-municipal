import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {

  courseList: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'PHP'];
  enable: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  setButton(): void {
    this.enable = (this.enable==true)? false: true;
  }

}
