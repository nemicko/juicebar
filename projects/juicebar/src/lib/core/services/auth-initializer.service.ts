import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInitializerService {
  constructor(private authService: AuthService) {}

  initializeAuth(): Promise<boolean> {
    return firstValueFrom(this.authService.checkAuthStatus());
  }
}
