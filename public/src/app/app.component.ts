import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RouterService } from './services/router.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  subscription:Subscription;

  user:any;

  constructor(private _userService:UserService) {
    this.subscription = this._userService.getUser().subscribe(data => {
      this.user = data
      console.log('this.data')
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  title = 'app';
}
