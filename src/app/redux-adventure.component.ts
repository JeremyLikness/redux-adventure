import { Component } from '@angular/core';
import { createStore, Store } from 'redux';
import { Dungeon } from './world/dungeon';
import { mainReducer } from './reducers/reducer.main';
import { createAction } from './actions/createAction';

@Component({
  selector: 'redux-adventure-app',
  templateUrl: './redux-adventure.component.html',
  styleUrls: ['./redux-adventure.component.css'],
})
export class ReduxAdventureComponent {

  private store: Store<Dungeon>;

  public dungeon: Dungeon;

  constructor() {
    this.store = createStore(mainReducer);
    this.dungeon = this.store.getState();
    this.store.subscribe(() => this.dungeon = this.store.getState());
  }
  title = 'Welcome to the Redux Adventure!';

  public handleAction(action: string): void {
    this.store.dispatch(createAction(this.store.getState(), action));
  }
}
