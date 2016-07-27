import { Room } from './room';
import { Thing } from './thing';

export class Dungeon {
    rooms: Room[] = [];
    inventory: Thing[] = [];
    trophyCount: number = 0;
    currentRoomIdx: number = -1;
    public get currentRoom(): Room {
        if (this.currentRoomIdx < 0 || this.currentRoomIdx >= this.rooms.length) {
            return null;
        }
        return this.rooms[this.currentRoomIdx];
    }
    public console: string [] = [];
    public won: boolean = false;
}