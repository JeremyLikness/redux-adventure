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

  it('should have as title \'redux-adventure works!\'',
      inject([ReduxAdventureAppComponent], (app: ReduxAdventureAppComponent) => {
    expect(app.title).toEqual('redux-adventure works!');
  }));
});
