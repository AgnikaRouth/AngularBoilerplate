import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CanActivateFn, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
// import { authGuard } from './app/core/guards/auth.guard';
import { AuthenticationService } from './app/core/services/authentication.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // BrowserModule,
    provideRouter(routes),
    provideHttpClient(),
    AuthenticationService,
    // provideGuard(authGuard),
  ],
}).catch((err) => console.error(err));
// function provideGuard(
//   authGuard: CanActivateFn
// ):
//   | import('@angular/core').Provider
//   | import('@angular/core').EnvironmentProviders {
//   throw new Error('Function not implemented.');
// }
