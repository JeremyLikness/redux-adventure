import { Thing } from '../world/thing';
import { things } from './reducer.things';
import { Room } from '../world/room';
import { IAction, IInventoryAction, IRoomAction } from '../actions/createAction';
import { ACTION_GET, ACTION_MOVE } from '../actions/ActionList';

export const room = (state: Room = new Room(), action: IAction) => {

    if (action.type === ACTION_GET) {
        let inventoryAction = action as IInventoryAction;
        let room = new Room();
        room.idx = state.idx;
        room.visited = state.visited;
        room.directions = [...state.directions];
        room.walls = [...state.walls];
        room.name = state.name; 
        room.description = state.description; 
        room.things = things(state.things, action); 
        return room; 
    }

    if (action.type === ACTION_MOVE && (<IRoomAction>action).newRoom.visited === false) {
        let room = new Room();
        room.idx = state.idx;
        room.visited = true;
        room.directions = [...state.directions];
        room.walls = [...state.walls];
        room.name = state.name; 
        room.description = state.description; 
        room.things = [...state.things]; 
        return room;
    }

    return state;

}