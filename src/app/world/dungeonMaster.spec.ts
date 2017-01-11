import { Dungeon } from './dungeon';
import { DUNGEON_MASTER } from './dungeonMaster';
import { THING_SEED } from '../seed/thingSeed';
import { CELLS } from '../settings';

describe('Room', () => {
    let dm: Dungeon = null;
    beforeEach(() => {
        dm = DUNGEON_MASTER();
    });
  it('should generate ' + CELLS + ' rooms',
     () => {
        expect(dm).not.toBeNull();
        expect(dm.rooms).not.toBeNull();
        expect(dm.rooms.length).toBe(CELLS);
  });
  it('should ensure every room has at most two walls', () => {
      for (let idx = 0; idx < dm.rooms.length; idx += 1) {
          let room = dm.rooms[idx];
          expect(room.walls.length).toBeLessThan(3);
      }
  });
  it('should place all artifacts in the rooms', () => {
      let artifacts = {};
      for (let idx = 0; idx < THING_SEED.length; idx += 1) {
          artifacts[THING_SEED[idx].name] = false;
      }
      for (let idx = 0; idx < dm.rooms.length; idx += 1) {
          let room = dm.rooms[idx];
          for (let innerIdx = 0; innerIdx < room.things.length; innerIdx += 1) {
              let thing = room.things[innerIdx];
              artifacts[thing.name] = true;
          }
      }
      for (let idx = 0; idx < THING_SEED.length; idx += 1) {
          expect(artifacts[THING_SEED[idx].name]).toBe(true);
      }
  });
  it('should pick a current random room', () => {
      expect(dm.currentRoomIdx).toBeGreaterThan(-1);
      expect(dm.currentRoomIdx).toBeLessThan(dm.rooms.length);
  });
  it('should return the current room based on the index', () => {
      expect(dm.currentRoom).toBe(dm.rooms[dm.currentRoomIdx]);
  });
  it('should add the current room text to the console', () => {
      expect(dm.console.length).toBe(1);
      expect(dm.console[0]).toEqual(dm.currentRoom.longDescription);
  });
  it('should set the trophy count', () => {
      expect(dm.trophyCount).toBe(THING_SEED.length);
  });
});
