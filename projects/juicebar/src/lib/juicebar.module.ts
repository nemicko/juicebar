import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {BASE_APP_CONFIG, BaseAppConfig} from './config/base-app.config';
import { authInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({})
export class BaseAppModule {
  static forRoot(config: BaseAppConfig): ModuleWithProviders<BaseAppModule> {
    return {
      ngModule: BaseAppModule,
      providers: [
        {
          provide: BASE_APP_CONFIG,
          useValue: config
        },
        provideHttpClient(
          withInterceptors([authInterceptor])
        ),
        provideAnimations()
      ]
    };
  }
}
