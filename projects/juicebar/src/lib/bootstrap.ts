import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import {BASE_APP_CONFIG, BaseAppConfig, ModuleConfig} from './config/base-app.config';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { authGuard } from './core/guards/auth.guard';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {LoginComponent} from './core/components/login/login.component';
import {MainComponent} from './core/components/main/main.component';
import {NavigationService} from './core/services/navigation.service';


export function provideJuicebar(config: BaseAppConfig): ApplicationConfig {
  const routes = generateRoutes(config.modules);

  return {
    providers: [
      provideHttpClient(withInterceptors([authInterceptor])),
      provideAnimations(),
      provideRouter(routes),
      importProvidersFrom(
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule
      ),
      {
        provide: BASE_APP_CONFIG,
        useValue: config
      },
      NavigationService, // Add NavigationService to providers
      {
        provide: APP_INITIALIZER,
        useFactory: addMenuItems,
        deps: [BASE_APP_CONFIG, NavigationService],
        multi: true
      },
      ...(config.providers || [])
    ]
  };
}

function addMenuItems(config: BaseAppConfig, navigationService: NavigationService): () => void {
  return () => {
    config.modules.forEach(module => {
      if (module.navigation) {
        navigationService.addMenuItem({
          label: module.navigation.label,
          route: module.path,
          icon: module.navigation.icon
        });
      }
    });
  };
}

function generateRoutes(modules: ModuleConfig[]): Routes {
  return [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '',
      component: MainComponent,
      canActivate: [authGuard],
      children: [
        {
          path: '',
          redirectTo: 'profile',
          pathMatch: 'full'
        },
        {
          path: 'profile',
          loadComponent: () =>
            import('../lib/core/components/profile/profile.component').then(m => m.ProfileComponent)
        },
        ...modules.map(module => ({
          path: module.path,
          ...(module.component ? { loadComponent: module.component } : { loadChildren: module.loadChildren }), // Conditional property assignment
          canActivate: module.guards || [],
          navigation: module.navigation
        }))
      ]
    }
  ];
}
