import { createStore } from 'redux';
import { Dungeon } from '../world/dungeon'; 
import { DungeonMaster } from '../world/dungeonMaster';
import { Directions } from '../world/directions';
import { IAction, ITextAction, IRoomAction, IInventoryAction, createAction } from '../actions/createAction';
import { ACTION_TEXT, ACTION_MOVE, ACTION_GET } from '../actions/ActionList';
import { console } from './reducer.console';
import { inventory } from './reducer.inventory';
import { rooms } from './reducer.rooms';


export const mainReducer = (state: Dungeon = DungeonMaster(), action: IAction) => {
    
    if (action.type === ACTION_TEXT) {
        return defaultReducer(state, action as ITextAction);
    }

    if (action.type == ACTION_MOVE) {
        return moveReducer(state, action as IRoomAction);
    }

    if (action.type == ACTION_GET) {
        return inventoryReducer(state, action as IInventoryAction);
    }

    return state;
}

const defaultReducer = (state: Dungeon, action: IAction) => {
    let dungeon = new Dungeon();
    dungeon.console = console(state.console, action);
    dungeon.currentRoomIdx = state.currentRoomIdx;
    dungeon.inventory = inventory(state.inventory, action);
    dungeon.trophyCount = state.trophyCount;
    dungeon.won = state.won; 
    dungeon.rooms = rooms(state.rooms, action);
    return dungeon;
}

const moveReducer = (state: Dungeon, action: IRoomAction) => {
    let newState = defaultReducer(state, action);
    newState.console = console(newState.console, {
        type: ACTION_TEXT,
        text: 'You move ' + Directions[action.direction] + '.'
    } as ITextAction);
    let newRoom = newState.currentRoom.directions[action.direction];
    newState.currentRoomIdx = newState.rooms.indexOf(newRoom);
    newState.console.push(newState.currentRoom.longDescription);
    return newState;
}

const inventoryReducer = (state: Dungeon, action: IInventoryAction) => {
    let newState = defaultReducer(state, action);
    newState.console.push('You pick up the ' + action.item.name + '.'); 
    return newState;
}