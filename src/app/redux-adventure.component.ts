import { Component } from '@angular/core';
import { createStore, Store } from 'redux';
import { Dungeon } from './world/dungeon';
import { mainReducer } from './reducers/reducer.main';
import { createAction } from './actions/createAction';
import { ConsoleComponent } from './console';
import { ParserComponent } from './parser';

@Component({
  moduleId: module.id,
  selector: 'redux-adventure-app',
  templateUrl: 'redux-adventure.component.html',
  styleUrls: ['redux-adventure.component.css'],
  directives: [ConsoleComponent, ParserComponent]
})
export class ReduxAdventureAppComponent {
  
  private _store: Store<Dungeon>; 

  public dungeon: Dungeon;
  
  constructor() {
    this._store = createStore(mainReducer);
    this.dungeon = this._store.getState();
    this._store.subscribe(() => this.dungeon = this._store.getState());
  }
  title = 'Welcome to the Redux Adventure!';

  public handleAction(action: string): void {
    this._store.dispatch(createAction(this._store.getState(), action));
  }
}
