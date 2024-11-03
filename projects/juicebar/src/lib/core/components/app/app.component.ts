import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {UserMenuComponent} from '../user-menu/user-menu.component';
import {NavigationService} from '../../services/navigation.service';
import {AuthService} from '../../services/auth.service';
//import { UserMenuComponent } from '../user-menu/user-menu.component';
//import { NavigationService } from '../../services/navigation.service';
//import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    UserMenuComponent,
    RouterLink,
    MatProgressSpinner
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport
          [mode]="'side'"
          [opened]="true">
        <mat-toolbar>Menu</mat-toolbar>
        <mat-nav-list>
          @for (item of menuItems(); track item.route) {
            <a mat-list-item [routerLink]="item.route">
              <mat-icon>{{item.icon}}</mat-icon>
              <span class="nav-label">{{item.label}}</span>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>{{appName}}</span>
          <span class="toolbar-spacer"></span>
          <app-user-menu></app-user-menu>
        </mat-toolbar>
        <div class="content">
          @if (isLoading$ | async) {
            <div class="loading-container">
              <mat-spinner></mat-spinner>
            </div>
          } @else {
            <router-outlet></router-outlet>
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 250px;
    }

    .content {
      padding: 20px;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .nav-label {
      margin-left: 8px;
    }

    .loading-container {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class AppComponent {
  menuItems;
  isLoading$ ;
  appName = 'Application'; // This should come from config

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService
  ) {
    this.menuItems = this.navigationService.getMenuItems();
    this.isLoading$ = this.authService.isLoading$;
  }
}
