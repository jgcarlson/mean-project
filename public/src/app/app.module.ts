import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from './services/user.service';
import { RouterService } from './services/router.service';
import { AuthService } from './services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot()

  ],
  providers: [
    UserService,
    RouterService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
