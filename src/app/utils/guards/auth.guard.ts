import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  logginUser: any;
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {
        this.logginUser = localStorage.getItem("user");
        if (this.logginUser) {
          resolve(true);
        } else {
          alert("Please login to Book")
          this.router.navigate(['/']);
          resolve(false);
        }
      });
  }
}
