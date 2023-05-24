import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Role } from '../models/role';

import { AuthService } from '../service/auth.service';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUserValue) {
      //convertir 
      var token=localStorage.getItem("currentUser");
      const decodedToken = jwt_decode(token);
      var perfil=decodedToken["sub"]["data"]["admin"]=='1'?'admin':'estudiante';
      const userRole = perfil;
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        this.router.navigate(['/authentication/signin']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/authentication/signin']);
    return false;
  }
}
