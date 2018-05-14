
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: AuthService,
    private router: Router
  ) {}

  canActivate(){
    if(this.loginService.isLoggedIn) return true;

    this.router.navigate(['/login'])
  }
  
}