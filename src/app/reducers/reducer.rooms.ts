import { Room } from '../world/room';
import { IAction, IInventoryAction } from '../actions/createAction';
import { ACTION_GET } from '../actions/ActionList';
import { room } from './reducer.room';

export const rooms = (state: Room[] = [], action: IAction) => {

    if (action.type === ACTION_GET) {
        let inventoryAction = action as IInventoryAction;
        let idx = state.indexOf(inventoryAction.room);
        return [...state.slice(0, idx), room(inventoryAction.room, inventoryAction), ...state.slice(idx+1)];
    }

    return state;
    
}