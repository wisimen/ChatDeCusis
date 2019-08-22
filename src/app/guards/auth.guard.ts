import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { isNullOrUndefined } from 'util';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.angularFireAuth.authState.pipe(map(auth => {
      if (isNullOrUndefined(auth)) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }));
  }
}
