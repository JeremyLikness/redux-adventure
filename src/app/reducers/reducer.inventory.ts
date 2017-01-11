import { Thing } from '../world/thing';
import { IInventoryAction } from '../actions/createAction';
import { ACTION_GET } from '../actions/ActionList';
import { Action } from 'redux';

export const inventory = (state: Thing[] = [], action: Action) => {

    if (action.type === ACTION_GET) {
        let inventoryAction = action as IInventoryAction;
        let newThing = new Thing();
        newThing.name = inventoryAction.item.name;
        newThing.description = inventoryAction.item.description;
        return [...state, newThing];
    }
    return state;
}
