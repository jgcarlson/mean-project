import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from './../models/user';
import { Router } from '@angular/router';
import 'rxjs';

import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private _userService:UserService, private router:Router, private _authService:AuthService) { }

  ngOnInit() {
    this._authService.logout();
  }

  users:any = [];

  newUser:any = new User;

  closed = true;

  user = {
    username: '',
    password: ''
  }

  logerrors:Array<any> = [];

  regerrors:Array<any> = [];

  registerUser() {
    this.regerrors = [];
    this._userService.create(this.newUser)
    .then(data => {
      this._authService.login(data)
  })
    .catch(data => console.log('registerUser-catch data:', data))
    this.newUser = new User;
  };

  login() {
    this.logerrors = [];
    this._authService.login(this.user)
    .then(data => {
      if (data.success) {
        this._userService.sendUser(data.user);
        this.router.navigate(['/dashboard']);
      }
    })
    .catch(data => console.log('Login-catch data:', data))
    this.user = { username: '', password: '' };
  };

  // read() {
  //   this._userService.read()
  //   .then(data => this.users = data)
  //   .catch(data => console.log('Register-catch data:', data));
  // };

  // logged() {
  //   this._userService.logged()
  //   .then(data => {console.log('Bool:', data.b)
  //     return data.b
  //   })
  //   .catch(data => console.log('Logged-catch data:', data.b))
  // }

  // logCheck() {
  //   this._userService.logged()
  //   .then(data => {
  //     if (data._id !== 'error' && data._id !== undefined) {
  //       console.log('Data ID', data._id)
  //       this.c = data._id;
  //       this.router.navigateByUrl("/dashboard");
  //     }})
  //   .catch(data => console.log('Logged-catch data:', data.b))
  // }


}
