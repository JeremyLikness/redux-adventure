import { Thing } from '../world/thing';
import { IAction, ITextAction } from '../actions/createAction';
import { ACTION_TEXT } from '../actions/ActionList';

export const console = (state: string[] = [], action: IAction) => {

    if (action.type === ACTION_TEXT) {
        let textAction = action as ITextAction;
        return [...state, textAction.text];   
    }

    return [...state];
    
}