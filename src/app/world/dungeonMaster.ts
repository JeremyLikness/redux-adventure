import { Dungeon } from './dungeon';
import { Room } from './room';
import { Directions, INVERSION_MAP } from './directions';
import { GeneratorSeed } from '../seed/generatorSeed';
import { THING_SEED } from '../seed/thingSeed';
import {
    GRID_SIZE,
    CELLS
} from '../settings';

function extractRandom<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}

const DIRECTION_MAP: number[] = [-1 * GRID_SIZE, GRID_SIZE, 1, -1];

let generateRooms = (dungeon: Dungeon) => {

    let seed: GeneratorSeed = new GeneratorSeed();

    for (let x = 0; x < CELLS; x += 1) {
        let room = new Room();
        room.idx = x;
        let description = extractRandom(seed.rooms).description;
        let wall = extractRandom(seed.walls).description;
        let feature = extractRandom(seed.features).description;
        room.name = 'A ' + description + ' room';
        room.description = 'You are standing inside a ' +
        description + ' room. You are surrounded by ' + wall
            + '. ' + feature;
        dungeon.rooms.push(room);
    }

    return dungeon;
};

let assign = (dungeon: Dungeon, idx: number, dir: Directions) => {
    let room = dungeon.rooms[idx];
    let otherRoom = dungeon.rooms[idx + DIRECTION_MAP[dir]];
    room.setDirection(dir, otherRoom);
    otherRoom.setDirection(INVERSION_MAP[dir], room);
    return dungeon;
};

let connectRooms = (dungeon: Dungeon) => {

    let gridLessOne = GRID_SIZE - 1;

    // first put walls around the perimeter and connect all internal rooms 
    // (the connection is converse, so connecting 1 -> 2 connects 2 -> 1)
    for (let northToSouth = 0; northToSouth < GRID_SIZE; northToSouth += 1) {
        for (let westToEast = 0; westToEast < GRID_SIZE; westToEast += 1) {
            let cell = northToSouth * GRID_SIZE + westToEast;
            let room = dungeon.rooms[cell];
            if (northToSouth === 0) {
                room.walls.push(Directions.North);
            }
            if (northToSouth === gridLessOne) {
                room.walls.push(Directions.South);
            }
            if (westToEast === 0) {
                room.walls.push(Directions.West);
            }
            if (westToEast === gridLessOne) {
                room.walls.push(Directions.East);
            }
            if (northToSouth < gridLessOne) {
                dungeon = assign(dungeon, cell, Directions.South);
            }
            if (westToEast < gridLessOne) {
                dungeon = assign(dungeon, cell, Directions.East);
            }
        }
    }

    for (let northToSouth = 1; northToSouth < gridLessOne; northToSouth += 1) {
        for (let westToEast = 1; westToEast < gridLessOne; westToEast += 1) {
            let cell = northToSouth * GRID_SIZE + westToEast;
            let room = dungeon.rooms[cell];
            if (room.walls.length > 0) {
                continue;
            }
            let options: {dir: Directions, room: Room}[] = [];
            for (let idx = 0; idx < room.directions.length; idx += 1) {
                if (room.directions[idx] !== null) {
                    options.push({dir: idx, room: room.directions[idx]});
                }
            }
            let wall = options[Math.floor(Math.random() * options.length)];
            if (wall.room.walls.length > 0) {
                continue;
            }
            // this room loses the reference and gains a wall 
            room.setDirection(wall.dir, null);
            room.walls.push(wall.dir);
            // other room loses the reference and gains a wall 
            wall.room.setDirection(INVERSION_MAP[wall.dir], null);
            wall.room.walls.push(INVERSION_MAP[wall.dir]);
        }
    }

    return dungeon;
};

let placeArtifacts = (dungeon: Dungeon) => {
    dungeon.trophyCount = THING_SEED.length;
    for (let idx = 0; idx < THING_SEED.length; idx += 1) {
        let roomIdx = Math.floor(Math.random() * CELLS);
        let room = dungeon.rooms[roomIdx];
        room.things.push(THING_SEED[idx]);
    }
    return dungeon;
};

export const DUNGEON_MASTER: () => Dungeon = () => {

    let dungeon: Dungeon = new Dungeon();

    dungeon = generateRooms(dungeon);
    dungeon = connectRooms(dungeon);
    dungeon = placeArtifacts(dungeon);
    dungeon.currentRoomIdx = Math.floor(Math.random() * CELLS);
    dungeon.currentRoom.visited = true;
    dungeon.console.push(dungeon.currentRoom.longDescription);

    return dungeon;
};
