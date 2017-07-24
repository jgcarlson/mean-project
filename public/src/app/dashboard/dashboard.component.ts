import { Component, OnInit } from '@angular/core';
import { User } from './../models/user';
import { Router } from '@angular/router';

import { UserService } from './../services/user.service';
import { RouterService } from './../services/router.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _userService:UserService, private router:Router, private _routerService:RouterService, private _authService:AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser)
  }

  ngOnInit() {

  }

  currentUser: User;
  users: User[] = [];

  c:string = '';

  logout() {
    this._authService.logout()
  }

  // logged() {
  //   this._userService.logged()
  //   .then(data => {
  //     if (data._id != 'error') {
  //       this.c = data._id;
  //     } else {
  //       this.c = '';
  //       this.router.navigateByUrl("/", { skipLocationChange: true });
  //     }})
  //   .catch(data => console.log('Logged-catch data:', data.b))
  // }

}
