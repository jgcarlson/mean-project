import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterService } from './services/router.service';

import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RouterService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
