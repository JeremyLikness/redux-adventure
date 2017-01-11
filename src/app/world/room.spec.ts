import { Directions } from './directions';
import { Room } from './room';

describe('Room', () => {
  it('should handle directions',
     () => {
        let room1 = new Room(),
        room2 = new Room(),
        room3 = new Room(),
        room4 = new Room(); 
        room1.setDirection(Directions.East, room2);
        room1.setDirection(Directions.South, room3);
        expect(room1.east).toBe(room2);
        expect(room1.south).toBe(room3);
  });
});
