import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubDomainGuard } from './subDomain.guard';
import { InvalidDomainComponent } from './invalid-domain/invalid-domain.component';
import { HomePageComponent } from './shared/home-page/home-page.component';
import { TelemedicineClientComponent } from './telemedicine-client/telemedicine-client.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    //redirectTo: '/web'
    //redirectTo: '/webadmin'
    redirectTo: '/home'
  },
  {
    path: 'web',
    canActivate: [SubDomainGuard],
    loadChildren: './platform/platform.module#PlatformModule'
  },
  {
    path: 'webadmin',
    loadChildren: './super-admin-portal/super-admin-portal.module#SuperAdminPortalModule'
  },
  {
    path: 'invalid-domain',
    component: InvalidDomainComponent,
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'client-signup',
    component: TelemedicineClientComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
