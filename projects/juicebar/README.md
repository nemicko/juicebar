# Juicebar

An Angular 18+ library providing a standard application shell with authentication, navigation, and module management.

## Features
- Authentication flow with login/logout
- Material Design layout with sidebar navigation
- Dynamic module registration
- Configurable routing
- Schematics for generating new modules

## Installation
```bash
npm install juicebar
```

## Basic Usage

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideJuicebar } from 'juicebar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideJuicebar({
      apiUrl: environment.apiUrl,
      appName: 'My Application',
      modules: [
        {
          path: 'users',
          component: () => import('./modules/users/users.component'),
          navigation: {
            label: 'Users',
            icon: 'people'
          }
        }
        // Add more modules here
      ]
    })
  ]
};

// app.component.ts
import { Component } from '@angular/core';
import { JuicebarComponent } from 'juicebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JuicebarComponent],
  template: '<lib-juicebar></lib-juicebar>'
})
export class AppComponent {}
```

## Generating New Modules
```bash
ng generate @juicebar/schematics:module my-module
```

## Configuration
The library can be configured through the BaseAppConfig interface:
```typescript
interface BaseAppConfig {
  apiUrl: string;         // Your API endpoint
  appName: string;        // Application name shown in header
  modules: ModuleConfig[];// Array of module configurations
  providers?: Provider[]; // Optional additional providers
}
```
