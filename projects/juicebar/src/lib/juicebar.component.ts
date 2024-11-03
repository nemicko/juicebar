import {Component, Inject, WritableSignal} from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserMenuComponent } from './core/components/user-menu/user-menu.component';
import {LoginComponent} from "./core/components/login/login.component";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {Observable} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'lib-juicebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    UserMenuComponent,
    LoginComponent,
    MatNavList,
    MatIcon,
    MatListItem,
    MatProgressSpinner
  ],
  template: `
    @if (isLoading$ | async) {
      <div class="loading-container">
        <mat-spinner></mat-spinner>
      </div>
    } @else {
      <router-outlet></router-outlet>
    }
  `,
})

export class JuicebarComponent {
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoading$ = this.authService.isLoading$;
  }
}
