import { Dungeon } from './dungeon';
import { Room } from './room';
import { Directions } from './directions';
import { GeneratorSeed } from '../seed/generatorSeed'; 
import { ThingSeed } from '../seed/thingSeed';

function extractRandom<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}

const DirectionMap: number[] = [-10, 10, 1, -1];
const InversionMap: Directions[] = [Directions.South, Directions.North, Directions.West, Directions.East];

let generateRooms = (dungeon: Dungeon) => {
    
    let seed: GeneratorSeed = new GeneratorSeed();
    
    for (let x = 0; x < 100; x += 1) {
        let room = new Room();
        room.idx = x; 
        let description = extractRandom(seed.rooms).description;
        let wall = extractRandom(seed.walls).description;
        let feature = extractRandom(seed.features).description;
        room.name = 'A ' + description + ' room';
        room.description = 'You are standing inside a ' + description + ' room. You are surrounded by ' + wall 
            + '. ' + feature;
        dungeon.rooms.push(room);
    }
    
    return dungeon;
}

let assign = (dungeon: Dungeon, idx: number, dir: Directions) => {
    let room = dungeon.rooms[idx];
    let otherRoom = dungeon.rooms[idx + DirectionMap[dir]];
    room.setDirection(dir, otherRoom);
    otherRoom.setDirection(InversionMap[dir], room);
    return dungeon;
}

let connectRooms = (dungeon: Dungeon) => {

    // firts put walls around the perimeter and connect all internal rooms (the connection is converse, so connecting 1 -> 2 connects 2 -> 1)
    for (let northToSouth = 0; northToSouth < 10; northToSouth += 1) {
        for (let westToEast = 0; westToEast < 10; westToEast += 1) {
            let cell = northToSouth * 10 + westToEast;
            let room = dungeon.rooms[cell];
            if (northToSouth === 0) {
                room.walls.push(Directions.North);
            }
            if (northToSouth === 9) {
                room.walls.push(Directions.South);
            }
            if (westToEast === 0) {
                room.walls.push(Directions.West);
            }
            if (westToEast === 9) {
                room.walls.push(Directions.East);
            }
            if (northToSouth < 9) {
                dungeon = assign(dungeon, cell, Directions.South);
            }
            if (westToEast < 9) {
                dungeon = assign(dungeon, cell, Directions.East);
            }
        }
    }

    for (let northToSouth = 1; northToSouth < 9; northToSouth += 1) {
        for (let westToEast = 1; westToEast < 9; westToEast += 1) {
            let cell = northToSouth * 10 + westToEast;
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
            let wall = options[Math.floor(Math.random()*options.length)];
            if (wall.room.walls.length > 0) {
                continue;
            }
            // this room loses the reference and gains a wall 
            room.setDirection(wall.dir, null);
            room.walls.push(wall.dir);
            // other room loses the reference and gains a wall 
            wall.room.setDirection(InversionMap[wall.dir], null);
            wall.room.walls.push(InversionMap[wall.dir]);
        }
    }

    return dungeon;
}

let placeArtifacts = (dungeon: Dungeon) => {
    dungeon.trophyCount = ThingSeed.length;
    for (let idx = 0; idx < ThingSeed.length; idx += 1) {
        let foundRoom = false; 
        let roomIdx = Math.floor(Math.random()*100); 
        let room = dungeon.rooms[roomIdx];
        room.things.push(ThingSeed[idx]);
    }
    return dungeon; 
}

export const DungeonMaster: () => Dungeon = () => {

    let dungeon: Dungeon = new Dungeon();    
    
    dungeon = generateRooms(dungeon);
    dungeon = connectRooms(dungeon);
    dungeon = placeArtifacts(dungeon);
    dungeon.currentRoomIdx = Math.floor(Math.random()*100); 
    dungeon.currentRoom.visited = true;
    dungeon.console.push(dungeon.currentRoom.longDescription);

    return dungeon; 
};