import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ReduxAdventureAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(ReduxAdventureAppComponent);

