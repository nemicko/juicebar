import { ApplicationConfig, Provider } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideRouter, Routes} from '@angular/router';
import {BASE_APP_CONFIG, BaseAppConfig, ModuleConfig} from './config/base-app.config';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AppComponent } from './core/components/app/app.component';

export function provideBaseApp(config: BaseAppConfig): ApplicationConfig {
  const routes = generateRoutes(config.modules);

  // Create the base providers first
  const baseProviders = [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimations(),
    provideRouter(routes)
  ];

  // Then add configuration
  const configProviders = [
    {
      provide: BASE_APP_CONFIG,
      useValue: config
    }
  ];

  return {
    providers: [
      ...baseProviders,
      ...configProviders,
      ...(config.providers || [])
    ]
  };
}

function generateRoutes(modules: ModuleConfig[]): Routes {
  return [
    {
      path: '',
      component: AppComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },
        ...modules.map(module => ({
          path: module.path,
          loadComponent: module.component,
          canActivate: module.guards || []
        }))
      ]
    },
    {
      path: 'login',
      loadComponent: () => import('./core/components/login/login.component')
        .then(m => m.LoginComponent)
    }
  ];
}
