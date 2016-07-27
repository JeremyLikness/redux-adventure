import { Thing } from '../world/thing';
import { IAction, IInventoryAction } from '../actions/createAction';
import { ACTION_GET } from '../actions/ActionList';

export const things = (state: Thing[] = [], action: IAction) => {

    if (action.type === ACTION_GET) {
        let inventoryAction = action as IInventoryAction;
        let idx = state.indexOf(inventoryAction.item);
        return [...state.slice(0, idx), ...state.slice(idx+1)];
    }

    return state;
    
}