import { HomeLayoutComponent } from './view/core/home-layout/view/home-layout.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './service/auth-service/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './view/core/login/login.component';
import { HomeLayoutModule } from './view/core/home-layout/home-layout.module';

const routes: Routes = [
  
  {
    path: '',
    component : LoginComponent,
  },
  {
    path: 'home',
    loadChildren : () => HomeLayoutModule,
    canActivate: [AuthGuard]
  },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  declarations: []
})
export class AppRoutingModule { }
