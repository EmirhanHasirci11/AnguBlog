import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { AuthInterceptor, interceptorHelper } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    interceptorHelper,
    provideHttpClient(withInterceptors([AuthInterceptor])), // Register interceptor before HttpClientModule
    HttpClientModule,
    provideMarkdown(),
  ],
};