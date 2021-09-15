/*
  Accessor for configuration properties.

  Loads properties in this order:
    1. From the Angular environment file ().
    2. (If present, overriding the above:) From the config.json file.

  The AppModule (see src\app\app.module.ts) loads this service as part
  of APPINITIALIZER, ensuring the application isn't started before the
  config settings are loaded.

 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from './../../../../environments/environment';
import { Config } from "./config";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  envName: string;
  apiBaseUrl: string;
  production: boolean;

  constructor(private httpClient: HttpClient) {
    // 1. From the Angular environment file.
    const environmentAny: any = environment;
    this.envName = environmentAny.envName;
    this.production = environmentAny.production;
    this.apiBaseUrl = environmentAny.apiBaseUrl;
  }

  loadConfig() {
    return this.httpClient
      .get<Config>('./assets/config.json')
      .toPromise()
      .then(config => {
        // 2. (If present, overriding the above:) From the config.json file.
        const configAny: any = config;

        if (configAny.envName != undefined) {
          this.production = configAny.production;
        }
        if (configAny.envName != undefined) {
          this.envName = `${configAny.envName}`;
        }
        if (config.apiBaseUrl != undefined) {
          this.apiBaseUrl = `${config.apiBaseUrl}`;
        }
      });
  }
}
