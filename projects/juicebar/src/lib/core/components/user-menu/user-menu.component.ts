import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  template: `
    @if (currentUser$ | async; as user) {
      <button mat-button [matMenuTriggerFor]="userMenu" class="user-button">
        <mat-icon>account_circle</mat-icon>
        <span class="username">{{ user.username }}</span>
        <mat-icon>arrow_drop_down</mat-icon>
      </button>

      <mat-menu #userMenu="matMenu">
        <a mat-menu-item routerLink="/profile">
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </a>
        <button mat-menu-item (click)="onLogout()">
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    }
  `,
  styles: [`
    .user-button {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .username {
      margin: 0 4px;
    }
  `]
})
export class UserMenuComponent {
  currentUser$ ;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
}

  onLogout() {
    this.authService.logout();
  }
}
