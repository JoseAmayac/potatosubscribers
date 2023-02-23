import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedInGuard implements CanActivate, CanLoad {
  constructor( private authService: AuthService,
               private router: Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authService.isAuthenticated();

    if( !isLoggedIn ) return true;

    this.router.navigateByUrl("/content");
    return false;
  }
  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authService.isAuthenticated();

    if( !isLoggedIn ) return true;

    this.router.navigateByUrl("/content");
    return false;
  }
}
