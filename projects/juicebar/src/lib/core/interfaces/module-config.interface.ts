import { Type } from '@angular/core';
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
