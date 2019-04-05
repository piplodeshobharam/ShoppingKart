import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take ,  tap ,  map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userInfo$.pipe(
      take(1),
      map((user) => (user ? true : false)),
      tap((authorized) => {
        if (!authorized) {
          this.router.navigate(['/signup']);
        }
      })
    );
  }
  }
