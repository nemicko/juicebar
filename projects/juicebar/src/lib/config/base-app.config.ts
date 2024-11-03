import {Provider, EnvironmentProviders, Type, InjectionToken} from '@angular/core';
import { CanActivateFn } from '@angular/router';

export interface ModuleConfig {
  path: string;
  component: () => Promise<Type<any>>;
  guards?: CanActivateFn[];
  navigation?: {
    label: string;
    icon?: string;
  };
}

export interface BaseAppConfig {
  apiUrl: string;
  appName: string;
  modules: ModuleConfig[];
  providers?: (Provider | EnvironmentProviders)[];
}

// Add this export
export const BASE_APP_CONFIG = new InjectionToken<BaseAppConfig>('BASE_APP_CONFIG');
