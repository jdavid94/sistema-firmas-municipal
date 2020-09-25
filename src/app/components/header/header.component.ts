import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public nav: NavbarService,
    public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //console.log(this.authService.user.username);
  }

  logout():void{
    this.authService.logout();
    Swal.fire({
        icon: 'success',
        title: 'Log Out',
        text: 'Sesion Finalizada'
    })
    this.router.navigate(['/login']);
  }

}
