// projects/shell/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideBaseApp } from 'juicebar';

export const appConfig: ApplicationConfig = provideBaseApp({
  apiUrl: 'http://localhost:3000',
  appName: 'Shell Application',
  modules: []  // Your base modules if any
});
