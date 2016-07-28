import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ReduxAdventureAppComponent } from '../app/redux-adventure.component';

beforeEachProviders(() => [ReduxAdventureAppComponent]);

describe('App: ReduxAdventure', () => {
  it('should create the app',
      inject([ReduxAdventureAppComponent], (app: ReduxAdventureAppComponent) => {
    expect(app).toBeTruthy();
  }));

});
