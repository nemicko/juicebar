import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/components/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./core/components/navigation/navigation.component')
        .then(m => m.NavigationComponent),
    canActivate: [authGuard],
    children: [  // All authenticated routes go here as children
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../lib/core/components/profile/profile.component')
            .then(m => m.ProfileComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
      // Add other module routes here
    ]
  }
];
