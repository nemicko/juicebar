import {Component, Inject, inject} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {NavigationService} from '../../services/navigation.service';
import {RouterLink, RouterOutlet} from '@angular/router';
import {UserMenuComponent} from '../user-menu/user-menu.component';
import {BASE_APP_CONFIG, BaseAppConfig} from '../../../config/base-app.config';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    UserMenuComponent,
    RouterOutlet,
  ]
})
export class MainComponent {
  private breakpointObserver = inject(BreakpointObserver);
  appName: string;
  menuItems;

  constructor(private navigationService: NavigationService,
              @Inject(BASE_APP_CONFIG) private config: BaseAppConfig,
              private authService: AuthService,) {
    this.menuItems = this.navigationService.getMenuItems();
    this.appName = config.appName;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
