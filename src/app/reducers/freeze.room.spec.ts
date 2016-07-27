import { Room } from '../world/room';

export const freezeRoom = (room: Room) => {
    Object.freeze(room.directions);
    Object.freeze(room.things);
    Object.freeze(room.walls);
    Object.freeze(room);
}