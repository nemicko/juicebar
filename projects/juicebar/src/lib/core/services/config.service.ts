import { Injectable } from '@angular/core';
import {AppConfig} from '../../config/app.config';
import {DEFAULT_CONFIG} from '../../config/default.config';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig;

  constructor() {
    // Merge default config with environment values
    this.config = {
      ...DEFAULT_CONFIG,
      ...environment
    };
  }

  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  getConfig(): AppConfig {
    return this.config;
  }

  // Optional: method to load config from backend
  /*
  loadConfig() {
    return this.http.get<AppConfig>('/api/config')
      .pipe(
        tap(config => {
          this.config = {
            ...this.config,
            ...config
          };
        })
      );
  }
  */
}
