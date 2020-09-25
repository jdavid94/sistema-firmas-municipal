import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../services/navbar.service';
import { UsersService } from './../../services/users.service';
import { User } from './../users/user';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public user: User = new User();

  constructor(public nav: NavbarService, public usersService: UsersService, public authService: AuthService) { }

  ngOnInit(): void {
    this.nav.show();
    this.loadUser();
}

  public loadUser(): void {
    let userT = this.authService.user;
    //console.log('Test:' + userT.username);
    this.usersService.getUsuario(userT.username).subscribe((resp:any) => {
      this.user = resp;
      //console.log(resp);
    })
  }
}
