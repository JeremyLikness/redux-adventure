import {
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';

import { Thing } from '../world/thing';
import { Room } from '../world/room';
import { IAction, IInventoryAction } from '../actions/createAction';
import { ACTION_GET } from '../actions/ActionList';
import { room } from './reducer.room';
import { freezeRoom } from './freeze.room.spec';

describe('room', () => {
  it('should do nothing for non-inventory actions',
     () => {
        let oldRoom = new Room(), thing = new Thing();
        oldRoom.things.push(thing);
        Object.freeze(thing);
        freezeRoom(oldRoom);
        expect(room(oldRoom, { type: 'TEST'})).toEqual(oldRoom);
  });
  it('should remove the inventory if it is a get action', () => {
        let oldRoom = new Room();
        let newRoom = new Room();
        let oldThing = new Thing();
        oldThing.name = 'X';
        oldRoom.things.push(oldThing);
        let action = {
            type: ACTION_GET,
            item: oldThing
        } as IInventoryAction;

        let expectedState = newRoom;

        Object.freeze(oldThing);
        freezeRoom(oldRoom);
        Object.freeze(action);

        expect(room(oldRoom, action)).toEqual(newRoom);
  });
});
