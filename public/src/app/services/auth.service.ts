import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
    constructor(private _http: Http) { }

    login(data) {
      return this._http.post('/api/authenticate', data)
      .map((res) => {
        let user = res.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }).
      toPromise();
    }

    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
    }
}
