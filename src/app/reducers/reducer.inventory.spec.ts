import { Thing } from '../world/thing';
import { IInventoryAction } from '../actions/createAction';
import { ACTION_GET } from '../actions/ActionList';
import { inventory } from './reducer.inventory';

describe('inventory', () => {
  it('should do nothing for non-inventory actions',
     () => {
        let state = [];
        Object.freeze(state);
        expect(inventory(state, { type: 'TEST'})).toEqual([]);
  });
  it('should add the inventory if it is a get action', () => {
        let newThing = new Thing();
        newThing.name = 'X';
        let action = {
            type: ACTION_GET,
            item: newThing
        } as IInventoryAction;

        let expectedState = [newThing];
        let inventoryStart = [];

        Object.freeze(action);
        Object.freeze(inventoryStart);

        expect(inventory(inventoryStart, action)).toEqual(expectedState);
  });
});
