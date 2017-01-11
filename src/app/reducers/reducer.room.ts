import { things } from './reducer.things';
import { Room } from '../world/room';
import { IRoomAction } from '../actions/createAction';
import { ACTION_GET, ACTION_MOVE } from '../actions/ActionList';
import { Action } from 'redux';

export const room = (state: Room = new Room(), action: Action) => {

    let newRoom = new Room();
    newRoom.idx = state.idx;
    newRoom.directions = [...state.directions];
    newRoom.walls = [...state.walls];
    newRoom.name = state.name; 
    newRoom.description = state.description; 
    newRoom.visited = state.visited;
    newRoom.things = action.type === ACTION_GET ? things(state.things, action) : [...state.things]; 

    if (action.type === ACTION_MOVE && (<IRoomAction>action).newRoom.visited === false) {
        newRoom.visited = true;
    }

    return newRoom;
};
