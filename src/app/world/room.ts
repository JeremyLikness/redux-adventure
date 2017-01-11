import { Directions } from './directions';
import { Thing } from './thing';

export class Room {

    public directions: Room[] = [null, null, null, null];
    public walls: Directions[] = [];
    public name: string = '';
    public description: string = '';
    public idx: number = -1;
    public visited: boolean = false;

    public static setIds(rooms: Room[]): void {
        for (let idx = 0; idx < rooms.length; idx += 1) {
            rooms[idx].idx = idx;
        }
    }

    public get longDescription(): string {
        let text = this.name + ': ' + this.description + '\r\n';
        if (this.things.length > 0) {
            text += 'You see ';
            let descriptions = this.things.map(thing => thing.description);
            text += descriptions.join(', and ');
            text += ' on the floor.\r\n';
        }
        let exits: Directions[] = [];
        for (let idx = 0; idx < this.directions.length; idx += 1) {
            if (this.directions[idx] !== null) {
                exits.push(<Directions>idx);
            }
        }
        if (exits.length == 1) {
            text += 'You see an exit to the ' + Directions[exits[0]];
        }
        else {
            let directionsText = exits.map(exit => Directions[exit]);
            text += 'You see exits in the directions: ';
            text += directionsText.join(', ');
        }
        return text;
    }

    public setDirection(dir: Directions, room: Room): void {
        this.directions[dir] = room;
    }

    public getDirection(dir): Room {
        return this.directions[dir];
    }

    public get north(): Room {
        return this.directions[Directions.North];
    }

    public get south(): Room {
        return this.directions[Directions.South];
    }

    public get east(): Room {
        return this.directions[Directions.East];
    }

    public get west(): Room {
        return this.directions[Directions.West];
    }

    public things: Thing[] = [];
}
