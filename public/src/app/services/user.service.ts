import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { User } from './../models/user';
import 'rxjs';

@Injectable()

export class UserService {

  constructor(private _http:Http) { }

  public user = new Subject<any>();

  sendUser(data:any) {
    this.user.next(data);
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  clearUser() {
    this.user.next();
  }

  create(user) {
    return this._http.post('/api/register', user)
    .map( data => data.json() )
    .toPromise();
  }

  getAll() {
    return this._http.get('/api/users', this.jwt())
    .map((response: Response) => response.json());
  }

  getById(id) {
    return this._http.get('/api/users/' + id, this.jwt())
    .map((response: Response) => response.json());
  }

  update(user) {
    return this._http.put('/api/users/' + user.id, user, this.jwt())
    .map((response: Response) => response.json());
  }

  delete(id) {
    return this._http.delete('/api/users/' + id, this.jwt())
    .map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser)
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

}
