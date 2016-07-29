import { Thing } from '../world/thing';
import { things } from './reducer.things';
import { Room } from '../world/room';
import { IAction, IInventoryAction, IRoomAction } from '../actions/createAction';
import { ACTION_GET, ACTION_MOVE } from '../actions/ActionList';

export const room = (state: Room = new Room(), action: IAction) => {

    let room = new Room();
    room.idx = state.idx;
    room.directions = [...state.directions];
    room.walls = [...state.walls];
    room.name = state.name; 
    room.description = state.description; 
    room.visited = state.visited;
    room.things = action.type === ACTION_GET ? things(state.things, action) : [...state.things]; 
    
    if (action.type === ACTION_MOVE && (<IRoomAction>action).newRoom.visited === false) {
        room.visited = true;
    }

    return room;

}