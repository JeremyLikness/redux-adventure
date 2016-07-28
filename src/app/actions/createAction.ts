import { Dungeon } from '../world/dungeon';
import { Room } from '../world/room';
import { Thing } from '../world/thing';
import { Directions } from '../world/directions';

import { 
    ACTION_E, 
    ACTION_EAST,
    ACTION_G,
    ACTION_GET,
    ACTION_I,
    ACTION_INVENTORY,
    ACTION_L,
    ACTION_LOOK,
    ACTION_N,
    ACTION_NORTH,
    ACTION_S,
    ACTION_SOUTH,
    ACTION_W,
    ACTION_WEST,
    ACTION_WON,
    ACTION_TEXT,
    ACTION_MOVE
    } from './ActionList';

export interface IAction {
    type: string; 
}

export interface ITextAction extends IAction {
    type: string;
    text: string;
}

export interface IRoomAction extends IAction {
    type: string;
    direction: Directions;
    newRoom: Room;
}

export interface IInventoryAction extends IAction {
    type: string;
    item: Thing;
    room: Room;
}

export interface IWonAction extends IInventoryAction { }

export interface IActionCreator {
    (dungeon: Dungeon, actionText: string): IAction;
}

export const createAction: IActionCreator = (dungeon: Dungeon, actionText: string) => {

    let text = actionText.toLowerCase().trim(); 

    if (text === ACTION_E || text === ACTION_EAST) {
        return checkDirection(dungeon, Directions.East);
    } 
    if (text === ACTION_N || text === ACTION_NORTH) {
        return checkDirection(dungeon, Directions.North);
    }
    if (text === ACTION_W || text === ACTION_WEST) {
        return checkDirection(dungeon, Directions.West);
    }
    if (text === ACTION_S || text === ACTION_SOUTH) {
        return checkDirection(dungeon, Directions.South);
    }
    
    if (text === ACTION_L || text === ACTION_LOOK) {
        return {
            type: ACTION_TEXT,
            text: dungeon.currentRoom.longDescription
        } as ITextAction;
    }

    if (text === ACTION_I || text === ACTION_INVENTORY) {
        return checkInventory(dungeon);
    }

    if (text === ACTION_G || text === ACTION_GET) {
        return checkGet(dungeon);
    }

    return {
        type: ACTION_TEXT,
        text: 'What did you say?'
    };
}

const checkDirection = (dungeon: Dungeon, dir: Directions) => {
    if (dungeon.currentRoom.directions[dir] === null) {
        return {
            type: ACTION_TEXT,
            text: 'You bump into the wall. OUCH!'
        } as IAction;
    }
    return {
        type: ACTION_MOVE, 
        direction: dir,
        newRoom: dungeon.currentRoom.directions[dir]
    } as IRoomAction;
}

const checkInventory = (dungeon: Dungeon) => {
    if (dungeon.inventory.length < 1) {
        return {
            type: ACTION_TEXT,
            text: 'You have nothing but the shirt on your back.'
        } as ITextAction; 
    }
    return {
        type: ACTION_TEXT,
        text: 'You are carrying ' + dungeon.inventory.map(i => i.name).join(', ') + '.'
    } as ITextAction;
}

const checkGet: (dungeon: Dungeon) => IAction = (dungeon: Dungeon) => {
    if (dungeon.currentRoom.things.length < 1) {
        return {
            type: ACTION_TEXT,
            text: 'You get down.'
        } as ITextAction;
    }

    let invCount = dungeon.inventory.length + 1; 
    if (dungeon.trophyCount === invCount) {
        return {
            type: ACTION_WON,
            item: dungeon.currentRoom.things[0],
            room: dungeon.currentRoom
        } as IWonAction;
    }
    return {
        type: ACTION_GET,
        item: dungeon.currentRoom.things[0],
        room: dungeon.currentRoom
    } as IInventoryAction; 
}
