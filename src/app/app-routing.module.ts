import { AuthGuard } from './service/login/auth.guard';
import { HomeComponent } from './view/components/home/home.component';
import { LoginLayoutComponent } from './view/core/layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './view/core/layout/home-layout/home-layout.component';
import { LoginComponent } from './view/core/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}