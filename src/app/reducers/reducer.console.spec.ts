import { Thing } from '../world/thing';
import { IAction, ITextAction } from '../actions/createAction';
import { ACTION_TEXT } from '../actions/ActionList';
import { console } from './reducer.console';

describe('console', () => {
  it('should do nothing for non-text actions', () => {
       let consoleStart = [];
       Object.freeze(consoleStart);
      expect(console(consoleStart, { type: 'TEST'})).toEqual([]);
  });
  it('should add the text if it is a get action', () => {
        let newText = 'X';
        let action = {
            type: ACTION_TEXT,
            text: newText
        } as ITextAction;

        let consoleStart = []; 
        let expectedState = [newText];

        Object.freeze(action);
        Object.freeze(consoleStart);

        expect(console(consoleStart, action)).toEqual(expectedState);
  });
});
