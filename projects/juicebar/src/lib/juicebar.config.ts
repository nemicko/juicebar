import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './juicebar.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import {AuthInitializerService} from './core/services/auth-initializer.service';
import {provideAnimations} from '@angular/platform-browser/animations';

function initializeAuth(authInitializer: AuthInitializerService) {
  return () => authInitializer.initializeAuth();
}

export const juicebarConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthInitializerService],
      multi: true
    }
  ]
};
