import { Action } from 'redux';
import { ITextAction } from '../actions/createAction';
import { ACTION_TEXT } from '../actions/ActionList';

export const console = (state: string[] = [], action: Action) => {

    if (action.type === ACTION_TEXT) {
        let textAction = action as ITextAction;
        return [...state, textAction.text];
    }

    return [...state];
};
