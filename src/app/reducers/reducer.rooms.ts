import { Room } from '../world/room';
import { IAction, IInventoryAction, IRoomAction } from '../actions/createAction';
import { ACTION_GET, ACTION_MOVE } from '../actions/ActionList';
import { room } from './reducer.room';

export const rooms = (state: Room[] = [], action: IAction) => {

    if (action.type === ACTION_GET) {
        let inventoryAction = action as IInventoryAction;
        let idx = inventoryAction.room.idx;
        return [...state.slice(0, idx), room(inventoryAction.room, inventoryAction), ...state.slice(idx+1)];
    }

    if (action.type === ACTION_MOVE) {
        let moveAction = action as IRoomAction;
        let idx = moveAction.newRoom.idx; 
        return [...state.slice(0, idx), room(moveAction.newRoom, moveAction), ...state.slice(idx+1)];
    }

    return state;
    
}