import { ApplicationConfig } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { AuthInterceptor, interceptorHelper } from './core/interceptors/auth.interceptor';
import { AuthService } from './features/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),AuthService,Router,CookieService,
    interceptorHelper,
    provideHttpClient(withInterceptors([AuthInterceptor])), // Register interceptor before HttpClientModule
    HttpClientModule,
    provideMarkdown(),
  ],
};