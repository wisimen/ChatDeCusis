import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.angularFireAuth.authState.pipe(map(auth => {
      if (isNullOrUndefined(auth)) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }));
  }
}
