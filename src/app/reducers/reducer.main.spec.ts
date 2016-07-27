import {
  describe,
  expect,
  beforeEach,
  it,
  inject
} from '@angular/core/testing';

import { Dungeon } from '../world/dungeon';
import { Thing } from '../world/thing';
import { Room } from '../world/room';
import { Directions } from '../world/directions';
import { IInventoryAction, IRoomAction } from '../actions/createAction';
import { ACTION_TEXT, ACTION_MOVE } from '../actions/ActionList';
import { ITextAction } from '../actions/createAction';
import { mainReducer } from './reducer.main';
import { freezeRoom } from './freeze.room.spec';

describe('main', () => {
    let dungeon: Dungeon = null, 
        room1: Room = null,
        room2: Room = null,
        thing1: Thing = null; 
    beforeEach(() => {
        dungeon = new Dungeon();
        room1 = new Room();
        room2 = new Room();
        thing1 = new Thing();
        thing1.name = 'Magic test thing';
        room1.name = 'Room 1'; 
        room2.name = 'Room 2';
        room2.things.push(thing1);
        room1.setDirection(Directions.East, room2);
        room2.setDirection(Directions.West, room1);
        dungeon.rooms.push(room1);
        dungeon.rooms.push(room2);
        dungeon.currentRoomIdx = 0;
        dungeon.trophyCount = 2; 

        Object.freeze(thing1);
        freezeRoom(room1);
        freezeRoom(room2);
        Object.freeze(dungeon.console);
        Object.freeze(dungeon.inventory);
        Object.freeze(dungeon.rooms);
        Object.freeze(dungeon);
    });

    it('should update the console for a text action', () => {
        let newState = mainReducer(dungeon, {
            type: ACTION_TEXT,
            text: 'test'
        } as ITextAction);
        expect(newState.rooms).toEqual(dungeon.rooms);
        expect(newState.console.length).toBe(1);
        expect(newState.console[0]).toEqual('test');
    });

    it('should update the current room on a move', () => {
        let newState = mainReducer(dungeon, {
            type: ACTION_MOVE, 
            direction: Directions.East 
        } as IRoomAction);
        expect(newState.rooms).toEqual(dungeon.rooms);
        expect(newState.currentRoom).toEqual(room2);
        expect(newState.console.length).toBeGreaterThan(0);
    });

});
