import { Thing } from '../world/thing';
import { things } from './reducer.things';
import { Room } from '../world/room';
import { IAction, IInventoryAction } from '../actions/createAction';
import { ACTION_GET } from '../actions/ActionList';

export const room = (state: Room = new Room(), action: IAction) => {

    if (action.type === ACTION_GET) {
        let inventoryAction = action as IInventoryAction;
        let room = new Room();
        room.directions = [...state.directions];
        room.walls = [...state.walls];
        room.name = state.name; 
        room.description = state.description; 
        room.things = things(state.things, action); 
        return room; 
    }
    return state;

}