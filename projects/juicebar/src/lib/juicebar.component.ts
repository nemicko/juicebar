import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationService} from './core/services/navigation.service';
import {CommonModule} from '@angular/common';

import {AuthService} from './core/services/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatProgressSpinnerModule],
  template: `
    @if (isLoading$ | async) {
      <div class="loading-container">
        <mat-spinner></mat-spinner>
      </div>
    } @else {
      <router-outlet></router-outlet>
    }
  `
})
export class JuicebarComponent implements OnInit {
  title = 'client';
  isLoading$;

  constructor(private navigationService: NavigationService, private authService: AuthService) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit() {
    // Initialize navigation items
    this.navigationService.addMenuItems([
      {
        label: 'Dashboard',
        route: '/dashboard',
        icon: 'dashboard'
      },
      {
        label: 'Users',
        route: '/users',
        icon: 'people'
      },
      // Add more menu items as needed
    ]);
  }

}
