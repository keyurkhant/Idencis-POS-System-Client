import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  isAuthenticated: any;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authenticationService.currentUser.subscribe((data) => {
      this.isAuthenticated = data;
    });
    if (this.isAuthenticated) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
