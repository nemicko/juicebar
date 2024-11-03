// auth-resolve.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthResolveGuard implements Resolve<User | null> {
  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | null> {
    return this.authService.checkAuthStatus().pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.authService.getUserInfo();
        } else {
          // Optionally redirect here or let the component handle it
          return of(null);
        }
      })
    );
  }
}
