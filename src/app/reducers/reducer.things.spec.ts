import { Thing } from '../world/thing';
import { IAction, IInventoryAction } from '../actions/createAction';
import { ACTION_GET } from '../actions/ActionList';
import { things } from './reducer.things';


describe('things', () => {
    let thing1: Thing = null, thing2: Thing = null, items: Thing[] = [];

    beforeEach(() => {
        thing1 = new Thing();
        thing1.name = 'X';
        
        Object.freeze(thing1);

        thing2 = new Thing();
        thing2.name = 'Y';
        
        Object.freeze(thing2);

        items = [thing1, thing2];
        Object.freeze(items);
    });
  
    it('should do nothing for non-inventory actions', () => {
        expect(things(items, { type: 'TEST'})).toEqual(items);
    });
    
    it('should remove the inventory if it is a get action', () => {
        
        let action = {
            type: ACTION_GET,
            item: thing1 
        } as IInventoryAction;

        let expectedState = [thing2];

        Object.freeze(action);

        expect(things(items, action)).toEqual(expectedState);
  });
});
