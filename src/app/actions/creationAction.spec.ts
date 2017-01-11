import { Directions } from '../world/directions';
import { Room } from '../world/room';
import { Dungeon } from '../world/dungeon';
import { Thing } from '../world/thing';
import { createAction } from './createAction';
import { 
    ACTION_WEST,
    ACTION_EAST,
    ACTION_LOOK,
    ACTION_TEXT,
    ACTION_GET,
    ACTION_WON,
    ACTION_MOVE
} from './ActionList';

describe('createAction', () => {
    
    let dm: Dungeon = null, room1: Room = null, room2: Room = null;
    
    beforeEach(() => {
        dm = new Dungeon();
        room1 = new Room();
        room2 = new Room();
        dm.rooms.push(room1);
        dm.rooms.push(room2);
        room1.setDirection(Directions.East, room2);
        room2.setDirection(Directions.West, room1);
        dm.currentRoomIdx = 0;
    });

    describe('directional action', () => {
        it('should return the text action if a wall exists', () => {
            expect(createAction(dm, ACTION_WEST).type).toEqual(ACTION_TEXT);
        });
        it('should return a directional action with the new room if an exit exists', () => {
            expect(createAction(dm, ACTION_EAST)).toEqual({
                type: ACTION_MOVE,
                direction: Directions.East,
                newRoom: room2 
            });
        });
    });

    describe('look', () => {
        it('should return the long description of the current room', () => {
            expect(createAction(dm, ACTION_LOOK)).toEqual({
                type: ACTION_TEXT,
                text: room1.longDescription
            });
        });
    });

    describe('inventory', () => {
        it('should return the text of the inventory', () => {
            expect(createAction(dm, ACTION_LOOK).type).toEqual(ACTION_TEXT);
        });
    });

    describe('get', () => {
        it('should return a text action if the room is empty', () => {
            expect(createAction(dm, ACTION_GET).type).toEqual(ACTION_TEXT);
        });
        it('should return a get action if there are other items remaining in the dungeon', () => {
            dm.currentRoom.things.push(new Thing());
            expect(createAction(dm, ACTION_GET).type).toEqual(ACTION_GET); 
        });
        it('should return the won action if the item is the final one', () => {
            dm.currentRoom.things.push(new Thing());
            dm.trophyCount = 1; 
            expect(createAction(dm, ACTION_GET).type).toEqual(ACTION_WON);
        });
    });

    describe('unknown', () => {
        it('should return a text action', () => {
            expect(createAction(dm, 'Random stuff').type).toEqual(ACTION_TEXT);
        })
    })

});
