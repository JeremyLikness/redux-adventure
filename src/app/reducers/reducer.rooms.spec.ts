import { Thing } from '../world/thing';
import { Room } from '../world/room';
import { IInventoryAction } from '../actions/createAction';
import { ACTION_GET } from '../actions/ActionList';
import { rooms } from './reducer.rooms';
import { freezeRoom } from './freeze.room.spec';

describe('rooms', () => {
    let room1: Room = null, room2: Room = null, room3: Room = null;
    let thing1: Thing = null, thing2: Thing = null, roomList: Room[] = [];

    beforeEach(() => {
        thing1 = new Thing();
        thing1.name = 'X';
        thing2 = new Thing();
        thing2.name = 'Y';
        room1 = new Room();
        room1.things.push(thing1);
        room2 = new Room();
        room2.things.push(thing2);
        room3 = new Room();
        roomList = [room1, room2, room3];

        Room.setIds(roomList);

        Object.freeze(thing1);
        Object.freeze(thing2);
        freezeRoom(room1);
        freezeRoom(room2);
        freezeRoom(room3);
        Object.freeze(roomList);
    });

    it('should do nothing for non-inventory actions', () => {
        expect(rooms(roomList, { type: 'TEST'})).toEqual(roomList);
    });

    it('should remove the inventory if it is a get action', () => {
        let action = {
            type: ACTION_GET,
            item: thing2,
            room: room2
        } as IInventoryAction;

        let room2empty = new Room();
        room2empty.idx = 1;
        let expectedState = [room1, room2empty, room3];

        Object.freeze(action);

        expect(rooms(roomList, action)).toEqual(expectedState);
  });
});
